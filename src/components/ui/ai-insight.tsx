import React from "react";
import { cn } from "@/lib/utils";

interface AiInsightProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function AiInsight({
  title,
  description,
  icon,
  className,
}: AiInsightProps) {
  return (
    <div
      className={cn(
        "relative z-1 p-md bg-[var(--bg-elevated)] rounded-lg shadow-sm mb-md flex items-start gap-md transition-all duration-normal ease-out hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg grid place-items-center text-white flex-shrink-0 relative overflow-hidden animate-ai-icon-glow">
        <div className="absolute inset-[-50%] bg-conic-gradient from-transparent via-white/30 to-transparent animate-spin"></div>
        <div className="relative z-10">{icon}</div>
      </div>

      <div className="flex-1">
        <div className="text-base font-semibold text-[var(--text-primary)] mb-xs">
          {title}
        </div>
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}

export function AiCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 relative overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-radial-gradient from-primary/10 to-transparent animate-ai-pulse"></div>
      <div className="relative z-1">{children}</div>
    </div>
  );
}
