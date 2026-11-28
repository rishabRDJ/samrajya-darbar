"use client";

import { useId, type CSSProperties } from "react";
import {
  row,
  rowDisabled,
  track,
  thumb,
  textCol,
  label as labelStyle,
  description as descStyle,
  srOnly,
  type Size,
} from "./Switch.styles";

export type SwitchProps = {
  id?: string;
  name?: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: Size;
  labelPosition?: "left" | "right";
  error?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
};

export function Switch({
  id: providedId,
  name,
  label,
  description,
  checked,
  onChange,
  size = "md",
  labelPosition = "right",
  error = false,
  disabled = false,
  style,
}: SwitchProps) {
  const autoId = useId();
  const id = providedId ?? autoId;

  const control = (
    <span style={track(size, checked, error)} role="presentation" aria-hidden>
      <span style={thumb(size, checked)} />
    </span>
  );

  const text = (
    <span style={textCol}>
      <span style={labelStyle}>{label}</span>
      {description && <span style={descStyle}>{description}</span>}
    </span>
  );

  return (
    <label htmlFor={id} style={{ ...row, ...(disabled ? rowDisabled : {}), ...style }}>
      <input
        id={id}
        name={name}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(e.target.checked)}
        aria-checked={checked}
        aria-invalid={error || undefined}
        style={srOnly}
      />
      {labelPosition === "left" && text}
      {control}
      {labelPosition === "right" && text}
    </label>
  );
}
