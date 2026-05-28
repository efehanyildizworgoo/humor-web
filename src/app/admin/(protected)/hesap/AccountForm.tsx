"use client";

import { useActionState } from "react";
import { Save, Lock, Mail } from "lucide-react";
import { updateAccountAction, type AccountState } from "./actions";
import { Field, Input, Button } from "../_components/ui";

export default function AccountForm({ currentEmail }: { currentEmail: string }) {
  const [state, action, pending] = useActionState<AccountState, FormData>(
    updateAccountAction,
    {},
  );

  return (
    <form action={action} className="space-y-6">
      {/* --- Account section ---------------------------------------------- */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          E-posta
        </h2>
        <Field
          label="E-posta adresi"
          required
          error={state.field === "email" ? state.error : undefined}
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8fa8]" />
            <Input
              name="email"
              type="email"
              required
              defaultValue={currentEmail}
              autoComplete="username"
              className="pl-9"
            />
          </div>
        </Field>
      </section>

      {/* --- Password section --------------------------------------------- */}
      <section className="space-y-4 border-t border-[#2a3158] pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a86dab]">
          Şifre Değiştir
        </h2>
        <p className="text-xs text-[#8b8fa8]">
          Şifreyi değiştirmek istemiyorsan yeni şifre alanlarını boş bırak; ama mevcut şifren
          her durumda gerekli (kimliğini doğrulamak için).
        </p>

        <Field
          label="Mevcut şifre"
          required
          error={state.field === "currentPassword" ? state.error : undefined}
        >
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8fa8]" />
            <Input
              name="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              className="pl-9"
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Yeni şifre"
            hint="En az 8 karakter"
            error={state.field === "newPassword" ? state.error : undefined}
          >
            <Input
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={0}
              placeholder="(boş = değiştirme)"
            />
          </Field>
          <Field
            label="Yeni şifre (tekrar)"
            error={state.field === "confirmPassword" ? state.error : undefined}
          >
            <Input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="(yukarıdakiyle aynı)"
            />
          </Field>
        </div>
      </section>

      {/* --- Footer ------------------------------------------------------- */}
      <div className="flex items-center justify-end gap-3 border-t border-[#2a3158] pt-4">
        {state.ok ? (
          <span className="text-xs text-emerald-300">Kaydedildi ✓</span>
        ) : null}
        {state.error && !state.field ? (
          <span className="text-xs text-red-400">{state.error}</span>
        ) : null}
        <Button type="submit" disabled={pending}>
          <Save className="h-4 w-4" />
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
