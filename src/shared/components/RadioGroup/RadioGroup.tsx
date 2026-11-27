'use client';

import { useId, useState, type CSSProperties } from 'react';
import {
  fieldset,
  legend as legendStyle,
  list,
  item,
  itemDisabled,
  ring,
  dot,
  textCol,
  label as labelStyle,
  description as descStyle,
  errorText as errorTextStyle,
  srOnly,
  type Size,
} from './RadioGroup.styles';

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
  direction?: 'vertical' | 'horizontal';
  size?: Size;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  showError?: boolean;
  style?: CSSProperties;
};

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  direction = 'vertical',
  size = 'md',
  error,
  required = false,
  disabled = false,
  showError = false,
  style,
}: RadioGroupProps) {
  const groupId = useId();
  const [touched, setTouched] = useState(false);
  const [focusedValue, setFocusedValue] = useState<string | null>(null);

  const hasError = Boolean(error) && (touched || showError);
  const errorMsg = typeof error === 'string' ? error : undefined;

  return (
    <fieldset
      disabled={disabled}
      aria-invalid={hasError || undefined}
      style={{ ...fieldset, ...style }}
    >
      {label && (
        <legend style={legendStyle}>
          {label}
          {required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}
        </legend>
      )}
      <div role="radiogroup" aria-label={label} style={list(direction)}>
        {options.map((opt) => {
          const selected = opt.value === value;
          const optDisabled = disabled || opt.disabled;
          const optId = `${groupId}-${opt.value}`;
          const focused = focusedValue === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              style={{ ...item, ...(optDisabled ? itemDisabled : {}) }}
            >
              <input
                id={optId}
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                disabled={optDisabled}
                required={required}
                onChange={() => onChange(opt.value)}
                onFocus={() => setFocusedValue(opt.value)}
                onBlur={() => {
                  setFocusedValue(null);
                  setTouched(true);
                  onBlur?.();
                }}
                style={srOnly}
              />
              <span style={ring(size, selected, hasError, focused)}>
                {selected && <span style={dot(size)} />}
              </span>
              <span style={textCol}>
                <span style={labelStyle(size)}>{opt.label}</span>
                {opt.description && (
                  <span style={descStyle}>{opt.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {hasError && errorMsg && (
        <span style={errorTextStyle} role="alert">
          {errorMsg}
        </span>
      )}
    </fieldset>
  );
}
