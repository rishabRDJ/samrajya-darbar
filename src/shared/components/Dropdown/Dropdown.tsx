"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  wrapper,
  labelStyle,
  requiredMark,
  sizes,
  trigger as triggerStyle,
  triggerOpen,
  triggerError,
  triggerDisabled,
  placeholderStyle,
  chevron,
  chevronOpen,
  popover,
  search as searchStyle,
  listbox,
  option as optionStyle,
  optionText,
  optionLabel,
  optionDesc,
  checkIcon,
  empty,
  helper as helperStyle,
  errorText,
  type Size,
} from "./Dropdown.styles";

export type DropdownOption = {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

export type DropdownProps = {
  id?: string;
  name?: string;
  label?: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  size?: Size;
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  showError?: boolean;
  style?: CSSProperties;
};

export function Dropdown({
  id: providedId,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Select an option",
  size = "md",
  error,
  helperText,
  required = false,
  disabled = false,
  searchable = false,
  showError = false,
  style,
}: DropdownProps) {
  const autoId = useId();
  const id = providedId ?? autoId;
  const listboxId = `${id}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) || option.description?.toLowerCase().includes(q)
    );
  }, [options, query, searchable]);

  const selected = options.find((option) => option.value === value) ?? null;
  const hasError = Boolean(error) && (touched || showError);
  const errorMsg = typeof error === "string" ? error : undefined;

  useEffect(() => {
    if (!open) return;
    const onDocDown = (_event: MouseEvent) => {
      if (!rootRef.current?.contains(_event.target as Node)) {
        setOpen(false);
        setTouched(true);
        setQuery("");
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open, onBlur]);

  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open, searchable]);

  const openMenu = () => {
    if (disabled) return;
    const initial = options.findIndex((option) => option.value === value);
    setActiveIdx(initial >= 0 ? initial : options.findIndex((option) => !option.disabled));
    setOpen(true);
  };

  const closeMenu = (restoreFocus = true) => {
    setOpen(false);
    setTouched(true);
    setQuery("");
    onBlur?.();
    if (restoreFocus) triggerRef.current?.focus();
  };

  const moveActive = (dir: 1 | -1) => {
    if (!filtered.length) return;
    let idx = activeIdx;
    for (let i = 0; i < filtered.length; i++) {
      idx = (idx + dir + filtered.length) % filtered.length;
      if (!filtered[idx]?.disabled) {
        setActiveIdx(idx);
        return;
      }
    }
  };

  const commitActive = () => {
    const opt = filtered[activeIdx];
    if (opt && !opt.disabled) {
      onChange(opt.value);
      closeMenu();
    }
  };

  const onTriggerKeyDown = (_event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!open) {
      if (_event.key === "ArrowDown" || _event.key === "Enter" || _event.key === " ") {
        _event.preventDefault();
        openMenu();
      }
      return;
    }
    if (_event.key === "Escape") {
      _event.preventDefault();
      closeMenu();
    } else if (_event.key === "ArrowDown") {
      _event.preventDefault();
      moveActive(1);
    } else if (_event.key === "ArrowUp") {
      _event.preventDefault();
      moveActive(-1);
    } else if (_event.key === "Enter") {
      _event.preventDefault();
      commitActive();
    }
  };

  const onSearchKeyDown = (_event: KeyboardEvent<HTMLInputElement>) => {
    if (_event.key === "ArrowDown") {
      _event.preventDefault();
      moveActive(1);
    } else if (_event.key === "ArrowUp") {
      _event.preventDefault();
      moveActive(-1);
    } else if (_event.key === "Enter") {
      _event.preventDefault();
      commitActive();
    } else if (_event.key === "Escape") {
      _event.preventDefault();
      closeMenu();
    }
  };

  const mergedTrigger: CSSProperties = {
    ...triggerStyle,
    ...sizes[size],
    ...(open ? triggerOpen : {}),
    ...(hasError ? triggerError : {}),
    ...(disabled ? triggerDisabled : {}),
  };

  return (
    <div ref={rootRef} style={{ ...wrapper, ...style }}>
      {label && (
        <label htmlFor={id} style={labelStyle} onClick={() => triggerRef.current?.focus()}>
          {label}
          {required && <span style={requiredMark}>*</span>}
        </label>
      )}
      <button
        ref={triggerRef}
        id={id}
        name={name}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-invalid={hasError || undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        style={mergedTrigger}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          {selected?.icon}
          <span
            style={{
              ...(!selected ? placeholderStyle : {}),
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          style={{ ...chevron, ...(open ? chevronOpen : {}) }}
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div style={popover}>
          {searchable && (
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search..."
              style={searchStyle}
              aria-label="Search options"
            />
          )}
          <ul
            id={listboxId}
            role="listbox"
            aria-activedescendant={
              activeIdx >= 0 ? `${id}-opt-${filtered[activeIdx]?.value}` : undefined
            }
            style={listbox}
          >
            {filtered.length === 0 ? (
              <li style={empty}>No results</li>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isActive = idx === activeIdx;
                return (
                  <li
                    key={opt.value}
                    id={`${id}-opt-${opt.value}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    onMouseEnter={() => !opt.disabled && setActiveIdx(idx)}
                    onClick={() => {
                      if (opt.disabled) return;
                      onChange(opt.value);
                      closeMenu();
                    }}
                    style={optionStyle(isActive, isSelected, !!opt.disabled)}
                  >
                    {opt.icon}
                    <span style={optionText}>
                      <span style={optionLabel}>{opt.label}</span>
                      {opt.description && <span style={optionDesc}>{opt.description}</span>}
                    </span>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden style={checkIcon}>
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
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {hasError && errorMsg ? (
        <span style={errorText} role="alert">
          {errorMsg}
        </span>
      ) : helperText ? (
        <span style={helperStyle}>{helperText}</span>
      ) : null}
    </div>
  );
}
