'use client';

import Link from 'next/link';
import { useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import {
  base,
  variants,
  variantsHover,
  sizes,
  iconOnlySizes,
  disabledStyle,
  fullWidthStyle,
  srOnly,
  spinnerStyle,
  type Variant,
  type Size,
} from './Button.styles';

export type ButtonProps = {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
};

function Spinner() {
  return (
    <svg style={spinnerStyle} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.25"
      />
      <path
        fill="currentColor"
        opacity="0.75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
      <style>{`@keyframes samrajya-spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function Button({
  text,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  className,
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const isDisabled = disabled || loading;
  const hasClassName = Boolean(className);

  const mergedStyle: CSSProperties = {
    ...base,
    ...(hasClassName ? {} : variants[variant]),
    ...(hasClassName || !hover || isDisabled ? {} : variantsHover[variant]),
    ...(hasClassName ? {} : iconOnly ? iconOnlySizes[size] : sizes[size]),
    ...(fullWidth && !hasClassName ? fullWidthStyle : {}),
    ...(isDisabled ? disabledStyle : {}),
    ...style,
  };

  const leftIcon = loading ? (
    <Spinner />
  ) : iconPosition === 'left' ? (
    icon
  ) : null;
  const rightIcon = !loading && iconPosition === 'right' ? icon : null;

  const content = (
    <>
      {leftIcon}
      <span style={iconOnly ? srOnly : undefined}>{text}</span>
      {rightIcon}
    </>
  );

  const hoverHandlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };

  if (href && !isDisabled) {
    const ariaLabel = iconOnly ? text : undefined;
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          aria-label={ariaLabel}
          style={mergedStyle}
          className={className}
          {...hoverHandlers}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        style={mergedStyle}
        className={className}
        {...hoverHandlers}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={iconOnly ? text : undefined}
      aria-busy={loading || undefined}
      style={mergedStyle}
      className={className}
      {...hoverHandlers}
    >
      {content}
    </button>
  );
}
