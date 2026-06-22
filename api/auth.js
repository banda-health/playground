import { createHash, randomBytes } from 'crypto';
import { getUserById } from './db.js';

function base64UrlEncode(buffer) {
  return buffer.toString('base64url');
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

export function registerAuthRoutes(app, { upsertUser, hubConfig: config }) {
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

    const state = base64UrlEncode(randomBytes(16));
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    req.session.oauthState = state;
    req.session.codeVerifier = codeVerifier;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      state,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      request_credentials: 'required',
    });

    res.redirect(`${config.hubUrl}/api/rest/oauth2/auth?${params}`);
  });

  app.get('/api/auth/callback', async (req, res) => {
    if (!config) {
      return res.redirect('/?auth_error=Hub%20SSO%20is%20not%20configured');
    }

    const { code, state, error, error_description: errorDescription } = req.query;

    if (error) {
      const message = encodeURIComponent(String(errorDescription || error));
      return res.redirect(`/?auth_error=${message}`);
    }

    if (!code || state !== req.session.oauthState) {
      return res.redirect('/?auth_error=Invalid%20OAuth%20state');
    }

    const codeVerifier = req.session.codeVerifier;
    delete req.session.oauthState;
    delete req.session.codeVerifier;

    try {
      const tokenRes = await fetch(`${config.hubUrl}/api/rest/oauth2/token`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: String(code),
          redirect_uri: config.redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!tokenRes.ok) {
        console.error('Hub token exchange failed:', await tokenRes.text());
        return res.redirect('/?auth_error=Failed%20to%20exchange%20authorization%20code');
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

      res.redirect('/');
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
