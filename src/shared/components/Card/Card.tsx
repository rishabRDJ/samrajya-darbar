'use client';

import Link from 'next/link';
import { useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import {
  base,
  interactive as interactiveStyle,
  interactiveHover,
  variants,
  mediaBox,
  body,
  header,
  headerLeft,
  title as titleStyle,
  subtitle as subtitleStyle,
  headerRight as headerRightStyle,
  content as contentStyle,
  footer as footerStyle,
  type Variant,
} from './Card.styles';

export type CardProps = {
  variant?: Variant;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  headerRight?: ReactNode;
  media?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
};

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function Card({
  variant = 'vertical',
  href,
  onClick,
  title,
  subtitle,
  headerRight,
  media,
  footer,
  children,
  style,
}: CardProps) {
  const [hover, setHover] = useState(false);
  const isInteractive = Boolean(href || onClick);
  const hasHeader = title || subtitle || headerRight;

  const merged: CSSProperties = {
    ...base,
    ...variants[variant],
    ...(isInteractive ? interactiveStyle : {}),
    ...(isInteractive && hover ? interactiveHover : {}),
    ...style,
  };

  const hoverHandlers = isInteractive
    ? {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        onFocus: () => setHover(true),
        onBlur: () => setHover(false),
      }
    : {};

  const inner = (
    <>
      {media && <div style={mediaBox[variant]}>{media}</div>}
      <div style={body}>
        {hasHeader && (
          <div style={header}>
            <div style={headerLeft}>
              {title && <div style={titleStyle}>{title}</div>}
              {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
            </div>
            {headerRight && <div style={headerRightStyle}>{headerRight}</div>}
          </div>
        )}
        {children && <div style={contentStyle}>{children}</div>}
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </>
  );

  if (href) {
    if (isExternal(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          style={merged}
          {...hoverHandlers}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} style={merged} {...hoverHandlers}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e as unknown as MouseEvent<HTMLElement>);
          }
        }}
        style={merged}
        {...hoverHandlers}
      >
        {inner}
      </div>
    );
  }

  return <div style={merged}>{inner}</div>;
}
