import * as React from "react";

// ============ Layout helpers ============
export function PageHeader({
  title,
  description,
  action,
  back,
}: {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        {back ? (
          <a
            href={back.href}
            className="mb-2 inline-flex items-center gap-1 text-xs text-[#8b8fa8] hover:text-white"
          >
            ← {back.label}
          </a>
        ) : null}
        <h1 className="truncate text-2xl font-bold tracking-tight text-white">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[#8b8fa8]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#2a3158] bg-[#111729]/60 ${
        padded ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#2a3158] py-16 text-center">
      <div className="text-base font-medium text-white">{title}</div>
      {description ? (
        <div className="mx-auto mt-1 max-w-sm text-sm text-[#8b8fa8]">{description}</div>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

// ============ Form controls ============
const fieldBase =
  "w-full rounded-lg border border-[#2a3158] bg-[#0d1220] px-3 py-2 text-sm text-[#e8e9f0] outline-none transition placeholder:text-[#5a6285] focus:border-[#6a4696] focus:ring-2 focus:ring-[#6a4696]/30 disabled:cursor-not-allowed disabled:opacity-50";

export function Label({
  children,
  required,
  hint,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#8b8fa8]">
      <span>
        {children}
        {required ? <span className="ml-0.5 text-red-400">*</span> : null}
      </span>
      {hint ? <span className="text-[10px] normal-case tracking-normal text-[#5a6285]">{hint}</span> : null}
    </label>
  );
}

export function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label ? (
        <Label required={required} hint={hint}>
          {label}
        </Label>
      ) : null}
      {children}
      {error ? <div className="mt-1 text-xs text-red-400">{error}</div> : null}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldBase} resize-y ${props.className ?? ""}`} />;
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode },
) {
  return (
    <select {...props} className={`${fieldBase} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#e8e9f0]">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-[#2a3158] bg-[#0d1220] text-[#6a4696] focus:ring-[#6a4696]"
      />
      <span>{label}</span>
    </label>
  );
}

// ============ Buttons ============
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#6a4696] to-[#a86dab] text-white shadow-lg shadow-[#6a4696]/20 hover:from-[#7463a9] hover:to-[#a86dab]",
  secondary:
    "border border-[#2a3158] bg-[#111729] text-white hover:border-[#6a4696] hover:bg-[#1a2240]",
  ghost: "text-[#8b8fa8] hover:bg-[#111729] hover:text-white",
  danger:
    "border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${sz} ${variantStyles[variant]} ${className}`}
    />
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}) {
  const sz = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition ${sz} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

// ============ Badges ============
export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "accent";
}) {
  const map: Record<string, string> = {
    default: "bg-[#1a2240] text-[#8b8fa8]",
    success: "bg-emerald-500/15 text-emerald-300",
    warning: "bg-amber-500/15 text-amber-300",
    accent: "bg-[#6a4696]/20 text-[#a86dab]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${map[tone]}`}
    >
      {children}
    </span>
  );
}
