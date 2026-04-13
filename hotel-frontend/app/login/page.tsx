'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import Link from 'next/link';

/* =========================
   🔹 TYPES
========================= */
type LoginForm = {
  email: string;
  password: string;
};

type FieldConfig = {
  label: string;
  key: keyof LoginForm;
  type: string;
};

type InputProps = {
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
};

type BackgroundProps = {
  yMain: MotionValue<number>;
  rotate: MotionValue<number>;
};

/* =========================
   🔹 CONFIG
========================= */
const fields: FieldConfig[] = [
  { label: 'Email Address', key: 'email', type: 'email' },
  { label: 'Password', key: 'password', type: 'password' },
];

/* =========================
   🔹 VALIDATION ENGINE
========================= */
const validateForm = (form: LoginForm) => {
  const errors: Partial<LoginForm> = {};

  if (!form.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = 'Invalid email format';

  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 6)
    errors.password = 'Minimum 6 characters required';

  return errors;
};

/* =========================
   🔹 MAIN COMPONENT
========================= */
export default function LoginPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* 🌌 PARALLAX */
  const { scrollY } = useScroll();
  const yMain = useTransform(scrollY, [0, 500], [0, -120]);
  const rotate = useTransform(scrollY, [0, 500], [0, 20]);

  /* 🧠 STATE */
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* =========================
     🔹 HANDLERS
  ========================= */
  const handleChange = useCallback(
    (key: keyof LoginForm, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));

      // live validation
      setErrors((prev) => ({ ...prev, [key]: '' }));
    },
    []
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      // 🔌 Replace with real API
      await new Promise((res) => setTimeout(res, 1200));

      setSuccess(true);

      setTimeout(() => router.push('/dashboard'), 800);
    } catch {
      setErrors({ email: 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     🔹 UI
  ========================= */
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020202] flex items-center justify-center px-6 text-zinc-400"
    >
      <Background yMain={yMain} rotate={rotate} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Header />

        <form onSubmit={handleLogin} className="space-y-8" noValidate>
          {/* Inputs */}
          <div className="space-y-6">
            {fields.map((field) => (
              <InputField
                key={field.key}
                label={field.label}
                type={field.type}
                value={form[field.key]}
                error={errors[field.key]}
                onChange={(val) => handleChange(field.key, val)}
              />
            ))}
          </div>

          {/* Submit */}
          <SubmitButton loading={loading} success={success} />
        </form>

        <Footer />
      </motion.div>
    </div>
  );
}

/* =========================
   🔹 COMPONENTS
========================= */

function Header() {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl font-light text-white tracking-[0.25em] uppercase">
        Yatri
        <span className="text-teal-400 italic lowercase tracking-normal">
          hub
        </span>
      </h1>

      <p className="mt-4 text-[10px] tracking-[0.4em] text-zinc-500 uppercase">
        Secure Access Portal
      </p>
    </header>
  );
}

/* 🔹 Input */
function InputField({ label, type, value, error, onChange }: InputProps) {
  return (
    <div className="group">
      <label className="text-[9px] uppercase tracking-widest text-zinc-600 group-focus-within:text-teal-400 transition">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label.toUpperCase()}
        aria-invalid={!!error}
        aria-describedby={`${label}-error`}
        className={`w-full bg-transparent border-b py-3 text-sm text-white outline-none transition
          ${error ? 'border-red-500' : 'border-zinc-800 focus:border-teal-500'}
        `}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${label}-error`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-red-400 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 🔹 Submit */
function SubmitButton({
  loading,
  success,
}: {
  loading: boolean;
  success: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={loading || success}
      className="w-full py-4 rounded-full bg-white text-black text-sm font-semibold tracking-widest transition hover:scale-[1.02] disabled:opacity-50"
    >
      {success
        ? 'Access Granted'
        : loading
        ? 'Verifying...'
        : 'Login'}
    </button>
  );
}

/* 🔹 Footer */
function Footer() {
  return (
    <div className="mt-16 text-center space-y-4">
      <Link
        href="/register"
        className="text-xs text-zinc-500 hover:text-white transition"
      >
        Create new account
      </Link>

      <p className="text-[10px] text-zinc-700">
        © 2026 YatriHub
      </p>
    </div>
  );
}

/* =========================
   🌌 BACKGROUND
========================= */

function Background({ yMain, rotate }: BackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <motion.div
        style={{ y: yMain, rotate }}
        className="absolute -right-40 top-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full"
      />
    </div>
  );
}