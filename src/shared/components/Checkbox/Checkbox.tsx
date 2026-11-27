'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
} from 'react';
import {
  row,
  rowDisabled,
  box,
  checkmark,
  textCol,
  label as labelStyle,
  description as descStyle,
  errorText as errorTextStyle,
  srOnly,
  boxSize,
  type Size,
} from './Checkbox.styles';

export type CheckboxProps = {
  id?: string;
  name?: string;
  label: string;
  description?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  size?: Size;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  showError?: boolean;
  style?: CSSProperties;
};

export function Checkbox({
  id: providedId,
  name,
  label,
  description,
  checked,
  indeterminate = false,
  onChange,
  onBlur,
  size = 'md',
  error,
  required = false,
  disabled = false,
  showError = false,
  style,
}: CheckboxProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const hasError = Boolean(error) && (touched || showError);
  const errorMsg = typeof error === 'string' ? error : undefined;

  const s = boxSize[size];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label
        htmlFor={id}
        style={{ ...row, ...(disabled ? rowDisabled : {}) }}
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked, e)}
          onBlur={(e) => {
            setTouched(true);
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError && errorMsg ? `${id}-error` : undefined}
          style={srOnly}
        />
        <span style={box(size, checked, indeterminate, hasError, focused)}>
          {(checked || indeterminate) && (
            <span style={checkmark}>
              {indeterminate ? (
                <svg width={s - 4} height={s - 4} viewBox="0 0 16 16" aria-hidden>
                  <rect x="3" y="7" width="10" height="2" fill="currentColor" />
                </svg>
              ) : (
                <svg width={s - 4} height={s - 4} viewBox="0 0 16 16" aria-hidden>
                  <path
                    d="M3 8l3 3 7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          )}
        </span>
        <span style={textCol}>
          <span style={labelStyle(size)}>{label}</span>
          {description && <span style={descStyle}>{description}</span>}
        </span>
      </label>
      {hasError && errorMsg && (
        <span id={`${id}-error`} style={errorTextStyle} role="alert">
          {errorMsg}
        </span>
      )}
    </div>
  );
}
