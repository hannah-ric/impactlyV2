import React from "react";
import { cn } from "@/lib/utils";

type ActivityVariant = "success" | "info" | "warning" | "danger";

interface ActivityItemProps {
  title: string;
  time: string;
  icon: React.ReactNode;
  variant?: ActivityVariant;
  className?: string;
}

export function ActivityItem({
  title,
  time,
  icon,
  variant = "info",
  className,
}: ActivityItemProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-md p-sm rounded-lg transition-all duration-fast ease-out hover:bg-[var(--bg-secondary)] hover:translate-x-1",
        className,
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-lg grid place-items-center flex-shrink-0 text-md transition-all duration-fast ease-out group-hover:scale-110 group-hover:-rotate-5",
          variant === "success" && "bg-success/10 text-success",
          variant === "info" && "bg-primary/10 text-primary",
          variant === "warning" && "bg-warning/10 text-warning",
          variant === "danger" && "bg-danger/10 text-danger",
        )}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">
          {title}
        </div>
        <div className="text-xs text-[var(--text-tertiary)]">{time}</div>
      </div>
    </div>
  );
}
