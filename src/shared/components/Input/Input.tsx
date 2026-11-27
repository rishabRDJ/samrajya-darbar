'use client';

import {
  useId,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
} from 'react';
import {
  wrapper,
  labelStyle,
  requiredMark,
  field,
  fieldFocus,
  fieldError,
  fieldErrorFocus,
  fieldDisabled,
  sizes,
  input as inputStyle,
  inputDisabled,
  affix,
  helper as helperStyle,
  errorText,
  type Size,
} from './Input.styles';

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

export type InputProps = {
  id?: string;
  name?: string;
  label?: string;
  type?: InputType;
  value: string | number;
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
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
  showError?: boolean;
  min?: number;
  max?: number;
  step?: number;
  style?: CSSProperties;
};

export function Input({
  id: providedId,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  size = 'md',
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  prefix,
  suffix,
  showError = false,
  min,
  max,
  step,
  style,
}: InputProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(error) && (touched || showError);
  const errorMsg = typeof error === 'string' ? error : undefined;
  const describedById = hasError
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  const fieldStyle: CSSProperties = {
    ...field,
    ...sizes[size],
    ...(focused ? fieldFocus : {}),
    ...(hasError ? fieldError : {}),
    ...(hasError && focused ? fieldErrorFocus : {}),
    ...(disabled ? fieldDisabled : {}),
  };

  return (
    <div style={{ ...wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
          {required && <span style={requiredMark}>*</span>}
        </label>
      )}
      <div style={fieldStyle}>
        {prefix && <span style={affix}>{prefix}</span>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value, e)}
          onBlur={(e) => {
            setTouched(true);
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
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
          style={{ ...inputStyle, ...(disabled ? inputDisabled : {}) }}
        />
        {suffix && <span style={affix}>{suffix}</span>}
      </div>
      {hasError && errorMsg ? (
        <span id={`${id}-error`} style={errorText} role="alert">
          {errorMsg}
        </span>
      ) : helperText ? (
        <span id={`${id}-helper`} style={helperStyle}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
