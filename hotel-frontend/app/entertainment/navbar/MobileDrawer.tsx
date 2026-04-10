// =========================
// FILE: components/navbar/MobileDrawer.tsx
// =========================
"use client";

import { X } from "lucide-react";
import Link from "next/link";
type MobileDrawerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MobileDrawer({ open, setOpen }: MobileDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 p-6">
      <button onClick={() => setOpen(false)}>
        <X />
      </button>

      <div className="mt-10 space-y-4">
        <Link href="/entertainment">Home</Link>
        <Link href="/entertainment/tv">TV Shows</Link>
        <Link href="/entertainment/movies">Movies</Link>
      </div>
    </div>
  );
}
