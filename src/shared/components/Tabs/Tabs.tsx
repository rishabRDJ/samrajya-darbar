"use client";

import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import {
  wrapper,
  wrapperVariants,
  sizes,
  tabBase,
  tabUnderlineBase,
  tabUnderlineActive,
  tabPillsActive,
  tabSegmentedActive,
  tabDisabled,
  badgeBase,
  badgeOnActivePill,
  type Variant,
  type Size,
} from "./Tabs.styles";

export type TabItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
};

export type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: Variant;
  size?: Size;
  style?: CSSProperties;
  "aria-label"?: string;
};

function activeStyleFor(variant: Variant): CSSProperties {
  if (variant === "underline") return tabUnderlineActive;
  if (variant === "pills") return tabPillsActive;
  return tabSegmentedActive;
}

export function Tabs({
  tabs,
  value,
  onChange,
  variant = "underline",
  size = "md",
  style,
  "aria-label": ariaLabel,
}: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (id: string) => {
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${id}"]`);
    el?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = tabs.filter((t) => !t.disabled);
    if (!enabled.length) return;
    const currentIdx = enabled.findIndex((t) => t.id === value);
    let nextIdx = currentIdx;

    switch (event.key) {
      case "ArrowLeft":
        nextIdx = currentIdx <= 0 ? enabled.length - 1 : currentIdx - 1;
        break;
      case "ArrowRight":
        nextIdx = currentIdx >= enabled.length - 1 ? 0 : currentIdx + 1;
        break;
      case "Home":
        nextIdx = 0;
        break;
      case "End":
        nextIdx = enabled.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextTab = enabled[nextIdx];
    onChange(nextTab.id);
    focusTab(nextTab.id);
  };

  const listStyle: CSSProperties = {
    ...wrapper,
    ...wrapperVariants[variant],
    ...style,
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      style={listStyle}
    >
      {tabs.map((tab) => {
        const active = tab.id === value;
        const tabStyle: CSSProperties = {
          ...tabBase,
          ...sizes[size],
          ...(variant === "underline" ? tabUnderlineBase : {}),
          ...(active ? activeStyleFor(variant) : {}),
          ...(tab.disabled ? tabDisabled : {}),
        };

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            data-tab-id={tab.id}
            aria-selected={active}
            aria-disabled={tab.disabled || undefined}
            tabIndex={active ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            style={tabStyle}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                style={{
                  ...badgeBase,
                  ...(active && variant === "pills" ? badgeOnActivePill : {}),
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
