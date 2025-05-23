import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center gap-sm hover:scale-105 transition-transform duration-fast",
        className,
      )}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-xl text-white relative overflow-hidden animate-logo-pulse">
        <div className="absolute inset-[-50%] bg-conic-gradient from-transparent via-white/40 to-transparent animate-spin z-0"></div>
        <span className="relative z-10">I</span>
      </div>
      {showText && (
        <span className="font-display text-xl font-bold gradient-text">
          Impactly
        </span>
      )}
    </Link>
  );
}

export default Logo;
