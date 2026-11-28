"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import {
  LuAtSign,
  LuCircleCheck,
  LuCircleX,
  LuLoader,
  LuLock,
  LuMail,
  LuPhone,
  LuUser,
  LuUserPlus,
} from "react-icons/lu";
import { authApi } from "@/api";
import { ApiError } from "@/lib/http/types";
import { Button } from "@/shared/components/Button/Button";
import { Input } from "@/shared/components/Input";
import type { RegisterDto } from "@/types/auth.types";

type FieldErrors = Partial<Record<keyof RegisterDto | "confirmPassword", string>>;
type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

const USERNAME_RE = /^[a-zA-Z0-9._-]{3,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapApiError(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 409)
      return "Username, email, or phone number is already in use";
    if (err.status === 400)
      return "Some fields are invalid. Please check and try again.";
    if (err.status === 429)
      return "Too many registration attempts. Please wait a minute and try again.";
  }
  return "Something went wrong. Please try again.";
}

function AvailabilityIcon({
  status,
  label,
}: {
  status: AvailabilityStatus;
  label: string;
}) {
  if (status === "checking") {
    return (
      <span
        title={`Checking ${label}…`}
        className="flex items-center text-zinc-400"
      >
        <LuLoader size={16} className="animate-spin" />
      </span>
    );
  }
  if (status === "available") {
    return (
      <span
        title={`${label} available`}
        className="flex items-center text-bull-green-600"
      >
        <LuCircleCheck size={16} />
      </span>
    );
  }
  if (status === "taken") {
    return (
      <span
        title={`${label} unavailable`}
        className="flex items-center text-bear-red-600"
      >
        <LuCircleX size={16} />
      </span>
    );
  }
  return null;
}

export function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState<AvailabilityStatus>("idle");
  const [emailStatus, setEmailStatus] = useState<AvailabilityStatus>("idle");

  const usernameReqId = useRef(0);
  const emailReqId = useRef(0);

  const clearFieldError = (key: keyof FieldErrors) => {
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateUsername = (v: string): string | undefined => {
    if (!v.trim()) return "Username is required";
    if (!USERNAME_RE.test(v.trim()))
      return "Username must contain only letters, digits, dot, underscore or hyphen (3–30 chars)";
    return undefined;
  };

  const validateEmail = (v: string): string | undefined => {
    if (!v.trim()) return "Email is required";
    if (!EMAIL_RE.test(v.trim())) return "Invalid email address";
    return undefined;
  };

  const validatePassword = (v: string): string | undefined => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (v.length > 128) return "Password must be at most 128 characters";
    return undefined;
  };

  const validatePhone = (v: string): string | undefined => {
    if (!v) return undefined;
    if (v.length > 20) return "Phone number must be at most 20 characters";
    return undefined;
  };

  const runUsernameCheck = async (raw: string) => {
    const value = raw.trim().toLowerCase();
    if (validateUsername(value)) return;
    const reqId = ++usernameReqId.current;
    setUsernameStatus("checking");
    try {
      const res = await authApi.checkUsername(value);
      if (reqId !== usernameReqId.current) return;
      if (res.available) {
        setUsernameStatus("available");
      } else {
        setUsernameStatus("taken");
        setErrors((e) => ({ ...e, username: "Username is already taken" }));
      }
    } catch {
      if (reqId !== usernameReqId.current) return;
      setUsernameStatus("idle");
    }
  };

  const runEmailCheck = async (raw: string) => {
    const value = raw.trim().toLowerCase();
    if (validateEmail(value)) return;
    const reqId = ++emailReqId.current;
    setEmailStatus("checking");
    try {
      const res = await authApi.checkEmail(value);
      if (reqId !== emailReqId.current) return;
      if (res.available) {
        setEmailStatus("available");
      } else {
        setEmailStatus("taken");
        setErrors((e) => ({ ...e, emailAddress: "Email is already in use" }));
      }
    } catch {
      if (reqId !== emailReqId.current) return;
      setEmailStatus("idle");
    }
  };

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    USERNAME_RE.test(username.trim()) &&
    EMAIL_RE.test(emailAddress.trim()) &&
    password.length >= 8 &&
    password.length <= 128 &&
    confirmPassword === password &&
    phoneNumber.length <= 20 &&
    usernameStatus !== "taken" &&
    emailStatus !== "taken";

  const validateAll = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!firstName.trim()) next.firstName = "First name is required";
    if (!lastName.trim()) next.lastName = "Last name is required";
    next.username = validateUsername(username);
    next.emailAddress = validateEmail(emailAddress);
    next.password = validatePassword(password);
    if (!next.password && confirmPassword !== password)
      next.confirmPassword = "Passwords do not match";
    next.phoneNumber = validatePhone(phoneNumber);
    (Object.keys(next) as (keyof FieldErrors)[]).forEach((k) => {
      if (!next[k]) delete next[k];
    });
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (usernameStatus === "taken" || emailStatus === "taken") return;

    setBanner(null);
    setSubmitting(true);

    const payload: RegisterDto = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: username.trim().toLowerCase(),
      emailAddress: emailAddress.trim().toLowerCase(),
      password,
      ...(phoneNumber.trim() ? { phoneNumber: phoneNumber.trim() } : {}),
    };

    try {
      await authApi.register(payload);
      router.push("/?registered=1");
    } catch (err) {
      setBanner(mapApiError(err));
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-[440px] rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
    >
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-zinc-100 bg-white shadow-sm">
        <LuUserPlus className="size-5 text-jade-green-900" />
      </div>

      <h1 className="mb-6 text-center text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
        Create your account
      </h1>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(v) => {
              setFirstName(v);
              clearFieldError("firstName");
            }}
            onBlur={() => {
              if (!firstName.trim())
                setErrors((e) => ({ ...e, firstName: "First name is required" }));
            }}
            placeholder="First name"
            autoComplete="given-name"
            prefix={<LuUser size={16} />}
            error={errors.firstName}
            disabled={submitting}
            showError={Boolean(errors.firstName)}
          />
          <Input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(v) => {
              setLastName(v);
              clearFieldError("lastName");
            }}
            onBlur={() => {
              if (!lastName.trim())
                setErrors((e) => ({ ...e, lastName: "Last name is required" }));
            }}
            placeholder="Last name"
            autoComplete="family-name"
            prefix={<LuUser size={16} />}
            error={errors.lastName}
            disabled={submitting}
            showError={Boolean(errors.lastName)}
          />
        </div>

        <Input
          name="username"
          type="text"
          value={username}
          onChange={(v) => {
            setUsername(v);
            clearFieldError("username");
            setUsernameStatus("idle");
          }}
          onBlur={() => {
            const msg = validateUsername(username);
            if (msg) {
              setErrors((e) => ({ ...e, username: msg }));
              setUsernameStatus("idle");
              return;
            }
            void runUsernameCheck(username);
          }}
          placeholder="Username"
          autoComplete="username"
          prefix={<LuAtSign size={16} />}
          suffix={
            <AvailabilityIcon status={usernameStatus} label="Username" />
          }
          success={usernameStatus === "available"}
          error={errors.username}
          disabled={submitting}
          showError={Boolean(errors.username)}
        />

        <Input
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={(v) => {
            setEmailAddress(v);
            clearFieldError("emailAddress");
            setEmailStatus("idle");
          }}
          onBlur={() => {
            const msg = validateEmail(emailAddress);
            if (msg) {
              setErrors((e) => ({ ...e, emailAddress: msg }));
              setEmailStatus("idle");
              return;
            }
            void runEmailCheck(emailAddress);
          }}
          placeholder="Email"
          autoComplete="email"
          prefix={<LuMail size={16} />}
          suffix={<AvailabilityIcon status={emailStatus} label="Email" />}
          success={emailStatus === "available"}
          error={errors.emailAddress}
          disabled={submitting}
          showError={Boolean(errors.emailAddress)}
        />

        <Input
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(v) => {
            setPhoneNumber(v);
            clearFieldError("phoneNumber");
          }}
          onBlur={() => {
            const msg = validatePhone(phoneNumber);
            if (msg) setErrors((e) => ({ ...e, phoneNumber: msg }));
          }}
          placeholder="Phone number (optional)"
          autoComplete="tel"
          prefix={<LuPhone size={16} />}
          error={errors.phoneNumber}
          disabled={submitting}
          showError={Boolean(errors.phoneNumber)}
        />

        <Input
          name="password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            clearFieldError("password");
            if (confirmPassword && confirmPassword !== v)
              setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
            else clearFieldError("confirmPassword");
          }}
          onBlur={() => {
            const msg = validatePassword(password);
            if (msg) setErrors((e) => ({ ...e, password: msg }));
          }}
          placeholder="Password"
          autoComplete="new-password"
          prefix={<LuLock size={16} />}
          error={errors.password}
          disabled={submitting}
          showError={Boolean(errors.password)}
        />

        <Input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(v) => {
            setConfirmPassword(v);
            if (v && password && v !== password)
              setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
            else clearFieldError("confirmPassword");
          }}
          onBlur={() => {
            if (!confirmPassword)
              setErrors((e) => ({ ...e, confirmPassword: "Please confirm your password" }));
            else if (confirmPassword !== password)
              setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
          }}
          placeholder="Confirm password"
          autoComplete="new-password"
          prefix={<LuLock size={16} />}
          suffix={
            confirmPassword && password && confirmPassword !== password ? (
              <span
                title="Passwords do not match"
                className="flex items-center text-bear-red-600"
              >
                <LuCircleX size={16} />
              </span>
            ) : null
          }
          success={
            confirmPassword.length > 0 && confirmPassword === password
          }
          error={errors.confirmPassword}
          disabled={submitting}
          showError={Boolean(errors.confirmPassword)}
        />
      </div>

      {banner && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {banner}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          text={submitting ? "Creating account…" : "Register"}
          type="submit"
          fullWidth
          loading={submitting}
          disabled={submitting || !canSubmit}
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <Button
          text="Back to Login"
          href="/"
          fullWidth
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200/90 bg-white font-medium text-zinc-900 shadow-xs transition-colors hover:bg-zinc-50"
        />
      </div>
    </form>
  );
}
