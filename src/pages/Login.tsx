import React, { useState } from 'react';
import type { User } from '../types';

interface Props {
  error?: string | null;
  devUserName?: string | null;
  onDevLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ error, devUserName, onDevLogin }) => {
  const [devLoading, setDevLoading] = useState(false);
  const [devError, setDevError] = useState('');

  const handleHubLogin = () => {
    window.location.href = '/api/auth/login';
  };

  const handleDevLogin = async () => {
    setDevLoading(true);
    setDevError('');
    const res = await fetch('/api/auth/dev-login', { method: 'POST', credentials: 'include' });
    setDevLoading(false);
    if (!res.ok) {
      setDevError('Dev login failed');
      return;
    }
    onDevLogin(await res.json());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xs shadow-sm border border-gray-200">
        <h1 className="text-base font-semibold text-gray-900 mb-1">Playground</h1>
        <p className="text-sm text-gray-400 mb-6">
          {devUserName
            ? 'Sign in to continue'
            : 'Sign in with your JetBrains Hub account to continue'}
        </p>
        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}
        {devError && (
          <p className="text-sm text-red-600 mb-4">{devError}</p>
        )}
        {devUserName ? (
          <button
            type="button"
            onClick={handleDevLogin}
            disabled={devLoading}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {devLoading ? 'Signing in...' : `Continue as ${devUserName}`}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleHubLogin}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Sign in with Hub
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
