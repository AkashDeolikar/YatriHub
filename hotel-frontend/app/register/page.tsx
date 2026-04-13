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
type FormState = {
  name: string;
  email: string;
  password: string;
};

type FieldConfig = {
  label: string;
  key: keyof FormState;
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
  yDots: MotionValue<number>;
  yMain: MotionValue<number>;
  rotate: MotionValue<number>;
};

/* =========================
   🔹 CONFIG
========================= */
const inputFields: FieldConfig[] = [
  { label: 'Full Name', key: 'name', type: 'text' },
  { label: 'Email Address', key: 'email', type: 'email' },
  { label: 'Password', key: 'password', type: 'password' },
];

/* =========================
   🔹 VALIDATION ENGINE
========================= */
const validateForm = (form: FormState) => {
  const errors: Partial<FormState> = {};

  if (!form.name) errors.name = 'Name is required';

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
export default function RegisterPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* 🌌 PARALLAX */
  const { scrollY } = useScroll();
  const yMain = useTransform(scrollY, [0, 500], [0, -120]);
  const yDots = useTransform(scrollY, [0, 500], [0, -40]);
  const rotate = useTransform(scrollY, [0, 500], [0, 20]);

  /* 🧠 STATE */
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);

  /* =========================
     🔹 HANDLERS
  ========================= */
  const handleChange = useCallback(
    (key: keyof FormState, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));

      // clear error on typing
      setErrors((prev) => ({ ...prev, [key]: '' }));
    },
    []
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      // 🔌 Replace with real API
      await new Promise((res) => setTimeout(res, 1500));

      router.push('/dashboard');
    } catch {
      setErrors({ email: 'Registration failed' });
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
      <BackgroundEffects yDots={yDots} yMain={yMain} rotate={rotate} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Header />

        <form onSubmit={handleRegister} className="space-y-8" noValidate>
          <div className="space-y-6">
            {inputFields.map((field) => (
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

          <SubmitButton loading={loading} />
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
        Credential Enrollment
      </p>
    </header>
  );
}

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

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 rounded-full bg-white text-black text-sm font-semibold tracking-widest hover:scale-[1.02] transition disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Create Account'}
    </button>
  );
}

function Footer() {
  return (
    <div className="mt-16 text-center space-y-4">
      <Link
        href="/login"
        className="text-xs text-zinc-500 hover:text-white transition"
      >
        Already have an account?
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

function BackgroundEffects({ yDots, yMain, rotate }: BackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Dots (stable positions) */}
      <motion.div style={{ y: yDots }} className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-teal-400 rounded-full"
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 29) % 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Glow */}
      <motion.div
        style={{ y: yMain, rotate }}
        className="absolute -right-40 top-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full"
      />
    </div>
  );
}