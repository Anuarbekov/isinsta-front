import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative flex h-9 w-16 cursor-pointer items-center rounded-full bg-slate-300 p-1 transition-colors duration-300 focus:outline-none dark:bg-slate-700"
      aria-label="Toggle color theme"
    >
      <div
        className={`flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        <span className="text-sm">{theme === "dark" ? "🌙" : "☀️"}</span>
      </div>

      <span className="sr-only">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
};
