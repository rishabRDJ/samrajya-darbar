import type { CSSProperties, ReactNode } from "react";
import {
  base,
  sizes,
  variants,
  dotColors,
  dotWrap,
  dotCore,
  dotPing,
  iconSizes,
  type Variant,
  type Size,
} from "./Badge.styles";

export type BadgeProps = {
  text: string;
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  pulse?: boolean;
  icon?: ReactNode;
  style?: CSSProperties;
};

export function Badge({
  text,
  variant = "neutral",
  size = "sm",
  dot = false,
  pulse = false,
  icon,
  style,
}: BadgeProps) {
  const merged: CSSProperties = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const dotColor = dotColors[variant];

  return (
    <span style={merged}>
      {dot && (
        <span style={dotWrap} aria-hidden>
          {pulse && <span style={{ ...dotPing, backgroundColor: dotColor }} />}
          <span style={{ ...dotCore, backgroundColor: dotColor }} />
          <style>{`@keyframes samrajya-ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
        </span>
      )}
      {icon && <span style={iconSizes[size]}>{icon}</span>}
      <span>{text}</span>
    </span>
  );
}
