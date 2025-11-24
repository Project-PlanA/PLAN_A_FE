import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "disabled";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "flex h-[40px] w-[330px] items-center justify-center rounded-[10px] text-sm font-semibold transition-colors";

  const isDisabled = disabled || variant === "disabled";

  const colorClass = isDisabled
    ? "bg-[#C4C4C4] text-white cursor-default"
    : "bg-[#00A1FF] text-white";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${base} ${colorClass} ${className}`}
    >
      {children}
    </button>
  );
}
