import React from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Heart } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  fullHeight?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  fullHeight = false,
}) => {
  return (
    <div
      className={`antialiased relative w-full overflow-hidden bg-slate-50 text-slate-900  dark:bg-black dark:text-slate-50 selection:bg-violet-200 transition-colors duration-300 flex flex-col ${
        fullHeight ? "h-screen" : "min-h-screen"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-end">
        <div className="pointer-events-auto p-4">
          <ThemeToggle />
        </div>
      </div>

      <main
        className={`relative z-10 w-full flex flex-col items-center ${
          fullHeight ? "flex-1 overflow-hidden" : "flex-1"
        }`}
      >
        {children}
      </main>

      <footer className="relative z-10 w-full py-6 flex items-center justify-center shrink-0">
        <p className=" text-xs text-slate-500 dark:text-slate-400 font-light flex items-center gap-1.5">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by
          meir
        </p>
      </footer>
    </div>
  );
};
