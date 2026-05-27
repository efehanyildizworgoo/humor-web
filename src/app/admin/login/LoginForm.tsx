"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#8b8fa8]">
          E-posta
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          autoFocus
          className="w-full rounded-lg border border-[#2a3158] bg-[#111729] px-4 py-3 text-[#e8e9f0] outline-none transition focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30"
          placeholder="admin@worgoo.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#8b8fa8]">
          Şifre
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-[#2a3158] bg-[#111729] px-4 py-3 text-[#e8e9f0] outline-none transition focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30"
          placeholder="••••••••"
        />
      </div>

      {state.error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-gradient-to-r from-[#6a4696] to-[#a86dab] px-4 py-3 font-semibold text-white shadow-lg shadow-[#6a4696]/20 transition hover:from-[#7463a9] hover:to-[#a86dab] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
