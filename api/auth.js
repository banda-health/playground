import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { getUserById } from './db.js';

function base64UrlEncode(buffer) {
  return buffer.toString('base64url');
}

function signOAuthState(secret, codeVerifier = null) {
  const nonce = base64UrlEncode(randomBytes(16));
  const payload = codeVerifier ? { nonce, codeVerifier } : { nonce };
  const payloadB64 = base64UrlEncode(Buffer.from(JSON.stringify(payload), 'utf8'));
  const signature = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

function verifyOAuthState(state, secret) {
  if (!state || typeof state !== 'string') return null;

  const dot = state.lastIndexOf('.');
  if (dot === -1) return null;

  const payloadB64 = state.slice(0, dot);
  const signature = state.slice(dot + 1);
  const expected = createHmac('sha256', secret).update(payloadB64).digest('base64url');

  try {
    if (signature.length !== expected.length
      || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!payload?.nonce) return null;
    return typeof payload.codeVerifier === 'string'
      ? { codeVerifier: payload.codeVerifier }
      : {};
  } catch {
    return null;
  }
}

function authRedirectError(res, message) {
  return res.redirect(`/?auth_error=${encodeURIComponent(message)}`);
}

function generateCodeVerifier() {
  return base64UrlEncode(randomBytes(32));
}

function generateCodeChallenge(verifier) {
  return createHash('sha256').update(verifier).digest('base64url');
}

const HUB_SERVICE_ID = '0-0-0-0-0';

function hubScope(clientId) {
  return process.env.HUB_SCOPE?.trim() || `${HUB_SERVICE_ID} ${clientId}`;
}

function usePkce() {
  return process.env.HUB_USE_PKCE === 'true';
}

function hubConfigFromEnv() {
  const hubUrl = process.env.HUB_URL?.replace(/\/$/, '');
  const clientId = process.env.HUB_CLIENT_ID;
  const clientSecret = process.env.HUB_CLIENT_SECRET;
  const redirectUri = process.env.HUB_REDIRECT_URI;

  if (!hubUrl || !clientId || !clientSecret || !redirectUri) {
    return null;
  }

  return {
    hubUrl,
    clientId,
    clientSecret,
    redirectUri,
    scope: hubScope(clientId),
  };
}

async function hubApiReachable(hubUrl) {
  try {
    const res = await fetch(`${hubUrl}/api/rest/users/me`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return res.ok || res.status === 401;
  } catch {
    return false;
  }
}

export async function resolveHubConfig() {
  const config = hubConfigFromEnv();
  if (!config) return null;

  if (await hubApiReachable(config.hubUrl)) return config;

  if (!config.hubUrl.endsWith('/hub')) {
    const withHubPath = `${config.hubUrl}/hub`;
    if (await hubApiReachable(withHubPath)) {
      console.warn(
        `WARNING: HUB_URL should include the Hub context path. Using ${withHubPath} instead of ${config.hubUrl}`,
      );
      return { ...config, hubUrl: withHubPath };
    }
  }

  console.warn(
    `WARNING: Hub API not reachable at ${config.hubUrl}/api/rest — check HUB_URL includes any path prefix (e.g. /hub)`,
  );
  return config;
}

export function isDevAuthBypassEnabled() {
  return process.env.DEV_AUTH_BYPASS === 'true' && process.env.NODE_ENV !== 'production';
}

function devUserConfig() {
  return {
    hubId: 'dev-local',
    name: process.env.DEV_AUTH_USER_NAME || 'Dev User',
    email: process.env.DEV_AUTH_USER_EMAIL || 'dev@localhost',
    avatarUrl: null,
  };
}

async function signInDevUser(req, upsertUser) {
  const user = await upsertUser(devUserConfig());
  req.session.userId = user.id;
  return user;
}

export function requireAuth(req, res, next) {
  if (req.session?.userId) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

export function registerAuthRoutes(app, { upsertUser, hubConfig: config, sessionSecret }) {
  const devBypass = isDevAuthBypassEnabled();

  if (devBypass) {
    console.warn('WARNING: DEV_AUTH_BYPASS is enabled — Hub login is skipped in development');
  } else if (!config) {
    console.warn('WARNING: Hub SSO not configured — set HUB_URL, HUB_CLIENT_ID, HUB_CLIENT_SECRET, HUB_REDIRECT_URI');
  }

  app.get('/api/auth/dev-available', (req, res) => {
    const { name } = devUserConfig();
    res.json({ available: devBypass, userName: devBypass ? name : null });
  });

  app.post('/api/auth/dev-login', async (req, res) => {
    if (!devBypass) {
      return res.status(404).json({ error: 'Dev auth bypass is not enabled' });
    }

    try {
      const user = await signInDevUser(req, upsertUser);
      res.json(user);
    } catch (err) {
      console.error('Dev login failed:', err);
      res.status(500).json({ error: 'Dev login failed' });
    }
  });

  app.get('/api/auth/login', (req, res) => {
    if (!config) {
      return res.status(503).json({ error: 'Hub SSO is not configured' });
    }

    const pkce = usePkce();
    const codeVerifier = pkce ? generateCodeVerifier() : null;
    const state = signOAuthState(sessionSecret, codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      state,
      scope: config.scope,
      request_credentials: 'required',
    });

    if (pkce && codeVerifier) {
      params.set('code_challenge', generateCodeChallenge(codeVerifier));
      params.set('code_challenge_method', 'S256');
    }

    res.redirect(`${config.hubUrl}/api/rest/oauth2/auth?${params}`);
  });

  app.get('/api/auth/callback', async (req, res) => {
    if (!config) {
      return res.redirect('/?auth_error=Hub%20SSO%20is%20not%20configured');
    }

    const { code, state: stateParam, error, error_description: errorDescription } = req.query;
    const state = Array.isArray(stateParam) ? stateParam[0] : stateParam;

    if (error) {
      const message = encodeURIComponent(String(errorDescription || error));
      return res.redirect(`/?auth_error=${message}`);
    }

    const oauthState = verifyOAuthState(state, sessionSecret);
    if (!code || !oauthState) {
      return authRedirectError(res, 'Invalid OAuth state');
    }

    try {
      const tokenBody = new URLSearchParams({
        grant_type: 'authorization_code',
        code: String(code),
        redirect_uri: config.redirectUri,
      });

      if (oauthState.codeVerifier) {
        tokenBody.set('code_verifier', oauthState.codeVerifier);
      }

      const tokenRes = await fetch(`${config.hubUrl}/api/rest/oauth2/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
        },
        body: tokenBody,
      });

      if (!tokenRes.ok) {
        const errorBody = await tokenRes.text();
        console.error('Hub token exchange failed:', errorBody);
        let hubMessage = 'Failed to exchange authorization code';
        try {
          const parsed = JSON.parse(errorBody);
          hubMessage = parsed.error_description || parsed.error || hubMessage;
        } catch {
          if (errorBody) hubMessage = errorBody.slice(0, 200);
        }
        return authRedirectError(res, hubMessage);
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) {
        return res.redirect('/?auth_error=No%20access%20token%20received');
      }

      const profileRes = await fetch(
        `${config.hubUrl}/api/rest/users/me?fields=id,login,name,profile(email,avatar(url))`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!profileRes.ok) {
        console.error('Hub profile fetch failed:', await profileRes.text());
        return res.redirect('/?auth_error=Failed%20to%20fetch%20user%20profile');
      }

      const profile = await profileRes.json();
      const hubId = String(profile.id);
      const name = profile.name || profile.login || hubId;
      const email = profile.profile?.email ?? null;
      const avatarUrl = profile.profile?.avatar?.url ?? null;

      const user = await upsertUser({ hubId, name, email, avatarUrl });
      req.session.userId = user.id;

      req.session.save((saveErr) => {
        if (saveErr) {
          console.error('Failed to save session after login:', saveErr);
          return res.redirect('/?auth_error=Failed%20to%20save%20session');
        }
        res.redirect('/');
      });
    } catch (err) {
      console.error('OAuth callback error:', err);
      res.redirect('/?auth_error=Authentication%20failed');
    }
  });

  app.post('/api/logout', (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  app.get('/api/me', requireAuth, async (req, res) => {
    const user = await getUserById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(user);
  });
}
