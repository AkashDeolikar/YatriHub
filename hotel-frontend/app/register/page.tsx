'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('Server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl"
      >

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">
            CREATE <span className="text-purple-500">OS</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Register New Profile
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
            type="text"
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-purple-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-purple-500 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Register'}
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:text-white">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
