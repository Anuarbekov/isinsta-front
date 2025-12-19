import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:border-slate-200",
    secondary:
      "bg-white/80 backdrop-blur-sm text-slate-700 border border-white/50 hover:bg-white hover:border-slate-200 shadow-sm hover:shadow-md dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-900 dark:hover:border-slate-500",
    ghost:
      "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/70",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
