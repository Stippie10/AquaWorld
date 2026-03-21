'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Inloggen mislukt');
        return;
      }

      Cookies.set('auth_token', data.token, { expires: 7 });
      router.push('/admin');
    } catch (err) {
      setError('Een fout is opgetreden');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative group max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-10 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 transition space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              🌊 AquaWorld
            </h1>
            <p className="text-slate-400 text-sm uppercase tracking-widest">Admin Login</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/30 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Gebruikersnaam
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 transition"
                placeholder="admin / mist"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder-slate-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden disabled:opacity-50 py-3 font-bold text-lg rounded-lg transition"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-600 group-hover:to-blue-700 transition duration-300"></div>
              <span className="relative text-cyan-400 group-hover:text-cyan-300 transition block">
                {loading ? 'Inloggen...' : '🔐 Inloggen'}
              </span>
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs uppercase tracking-widest">
            Alleen voor administrators
          </p>
        </div>
      </div>
    </div>
  );
}
