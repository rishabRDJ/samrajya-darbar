"use client";

import { LuEye, LuEyeOff } from "react-icons/lu";
import { useId, useState, type ChangeEvent, type FocusEvent, type ReactNode } from "react";

type InputType = "text" | "email" | "password" | "number" | "search" | "tel" | "url";
type Size = "sm" | "md" | "lg";

export type InputProps = {
  id?: string;
  name?: string;
  label?: string;
  type?: InputType;
  value: string | number;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: Size;
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  success?: boolean;
  showError?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-2.5 text-[13px]",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-3.5 text-base",
};

export function Input({
  id: providedId,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  size = "md",
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  prefix,
  suffix,
  success = false,
  showError = false,
  min,
  max,
  step,
  className,
}: InputProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(error) && (touched || showError);
  const errorMsg = typeof error === "string" ? error : undefined;
  const describedById = hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  const isPassword = type === "password";
  const effectiveType = isPassword && showPassword ? "text" : type;

  const showSuccess = success && !hasError;
  const fieldClasses = [
    "flex items-center gap-2 rounded-lg border bg-white transition-colors",
    "focus-within:ring-2 focus-within:ring-offset-0",
    hasError
      ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
      : showSuccess
        ? "border-bull-green-500 focus-within:border-bull-green-500 focus-within:ring-bull-green-500/20"
        : "border-zinc-200 focus-within:border-zinc-400 focus-within:ring-zinc-900/10",
    disabled ? "bg-zinc-100 opacity-60 cursor-not-allowed" : "",
    sizeClasses[size],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={id} className="cursor-pointer text-[13px] font-medium text-zinc-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className={fieldClasses}>
        {prefix && <span className="flex shrink-0 items-center text-zinc-400">{prefix}</span>}
        <input
          id={id}
          name={name}
          type={effectiveType}
          value={value}
          onChange={(event) => onChange(event.target.value, event)}
          onBlur={(event) => {
            setTouched(true);
            onBlur?.(event);
          }}
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          aria-invalid={hasError || undefined}
          aria-describedby={describedById}
          className={[
            "w-full flex-1 border-0 bg-transparent p-0 text-zinc-900 outline-none",
            "placeholder:text-zinc-400",
            disabled ? "cursor-not-allowed" : "cursor-text",
          ].join(" ")}
        />
        {suffix && <span className="flex shrink-0 items-center text-zinc-400">{suffix}</span>}
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="flex shrink-0 cursor-pointer items-center text-zinc-400 hover:text-zinc-600"
          >
            {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
          </button>
        )}
      </div>
      {hasError && errorMsg ? (
        <span id={`${id}-error`} role="alert" className="min-h-4 text-xs text-red-600">
          {errorMsg}
        </span>
      ) : helperText ? (
        <span id={`${id}-helper`} className="min-h-4 text-xs text-zinc-500">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
