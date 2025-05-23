import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type StatVariant = "default" | "success" | "warning" | "danger";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: StatVariant;
  progress?: number;
  className?: string;
  animated?: boolean;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  variant = "default",
  progress,
  className,
  animated = true,
}: StatCardProps) {
  const valueRef = useRef<HTMLDivElement>(null);

  // Animate value on load
  useEffect(() => {
    if (!animated || !valueRef.current || typeof value !== "number") return;

    const animateValue = (start: number, end: number, duration: number) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);

        if (valueRef.current) {
          valueRef.current.textContent = current.toString();
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    animateValue(0, Number(value), 1500);
  }, [value, animated]);

  return (
    <div
      className={cn(
        "relative bg-[var(--bg-elevated)] border border-[var(--border-secondary)] rounded-xl p-lg overflow-hidden transition-all duration-normal ease-out cursor-pointer hover:translate-y-[-4px] hover:shadow-xl hover:border-transparent",
        className,
      )}
      style={
        {
          "--stat-color":
            variant === "success"
              ? "var(--color-success)"
              : variant === "warning"
                ? "var(--color-warning)"
                : variant === "danger"
                  ? "var(--color-danger)"
                  : "var(--color-primary)",
        } as React.CSSProperties
      }
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--stat-color)] to-transparent scale-x-0 origin-left transition-transform duration-normal ease-out group-hover:scale-x-100"></div>

      <div className="flex items-start justify-between gap-md mb-md">
        <div className="flex-1">
          <div className="text-sm font-medium text-[var(--text-secondary)] mb-xs">
            {label}
          </div>
          <div
            ref={valueRef}
            className={cn(
              "text-3xl font-extrabold text-[var(--text-primary)] tabular-nums leading-none",
              animated &&
                "bg-gradient-to-br from-[var(--stat-color)] to-accent bg-clip-text text-transparent animate-gradientShift",
            )}
          >
            {value}
          </div>

          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-xs p-xs px-sm mt-sm text-xs font-semibold rounded-full",
                trend.isPositive !== false
                  ? "bg-success/10 text-success"
                  : "bg-danger/10 text-danger",
              )}
            >
              <svg
                className="w-3.5 h-3.5 animate-trend-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{
                  transform:
                    trend.isPositive !== false ? "none" : "rotate(180deg)",
                }}
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              </svg>
              {trend.value > 0 && "+"}
              {trend.value}
              {trend.label}
            </div>
          )}
        </div>

        {icon && (
          <div className="w-12 h-12 grid place-items-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-[var(--stat-color)] text-xl transition-all duration-normal ease-out group-hover:scale-110 group-hover:rotate-5 group-hover:shadow-md">
            {icon}
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-md">
          <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[var(--stat-color)] to-accent rounded-full relative transition-width duration-slower ease-out overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
