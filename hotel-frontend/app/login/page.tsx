"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

/* ================= TYPES ================= */
type LoginForm = {
  email: string;
  password: string;
};

type InputProps = {
  label: string;
  value: string;
  type: string;
  error?: string;
  onChange: (value: string) => void;
};

/* ================= VALIDATION ================= */
const validate = (form: LoginForm) => {
  const e: Partial<LoginForm> = {};
  if (!form.email) e.email = "Required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid";

  if (!form.password) e.password = "Required";
  else if (form.password.length < 6) e.password = "Too short";

  return e;
};

/* ================= MAIN ================= */
export default function LoginPage() {
  const router = useRouter();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -80]);
  const blur = useTransform(scrollY, [0, 300], [40, 80]);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (k: keyof LoginForm, v: string) => {
      setForm((p) => ({ ...p, [k]: v }));
      setErrors((p) => ({ ...p, [k]: "" }));
    },
    []
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    setErrors(err);

    if (Object.keys(err).length) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      {/* 🌌 AMBIENT BACKGROUND */}
      <motion.div
        style={{ y, filter: blur }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full" />
      </motion.div>

      {/* 🌑 GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="
          rounded-[28px]
          bg-white/[0.04]
          backdrop-blur-3xl
          border border-white/10
          shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          p-10
        ">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-semibold text-white">
              Yatri<span className="text-indigo-400">Hub</span>
            </h1>
            <p className="text-sm text-white/40 mt-1">
              Continue your journey
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-7">

            <Input
              label="Email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(v: string) => handleChange("email", v)}
            />

            <Input
              label="Password"
              type="password"
              value={form.password}
              error={errors.password}
              onChange={(v: string) => handleChange("password", v)}
            />

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="
                w-full py-3 rounded-full
                bg-white text-black font-medium text-sm
                transition
                hover:bg-white/90
                active:bg-white/80
                disabled:opacity-50
              "
            >
              {loading ? "Signing in..." : "Continue"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="text-sm text-white/40 hover:text-white transition"
            >
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, value, onChange, error, type }: InputProps) {
  const active = value.length > 0;

  return (
    <div className="relative group">

      <input
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="
          w-full bg-transparent
          border-b border-white/10
          focus:border-white
          py-3 text-white outline-none
          transition
        "
      />

      {/* LABEL */}
      <label
        className={`
          absolute left-0 transition-all duration-300 pointer-events-none
          ${
            active
              ? "-top-3 text-xs text-white/40"
              : "top-3 text-sm text-white/30"
          }
          group-focus-within:-top-3
          group-focus-within:text-xs
          group-focus-within:text-white/50
        `}
      >
        {label}
      </label>

      {/* FOCUS GLOW */}
      <div className="
        absolute bottom-0 left-0 right-0 h-[1px]
        bg-white opacity-0
        group-focus-within:opacity-100
        transition
      " />

      {/* ERROR */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}