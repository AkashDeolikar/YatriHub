'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl"
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">
            HOTEL <span className="text-indigo-500">OS</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Secure Access Portal
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-2 rounded-xl">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="EMAIL"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="PASSWORD"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Authorizing...' : 'Login'}
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-xs mt-6">
          New user?{' '}
          <Link href="/register" className="text-indigo-400 hover:text-white">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
