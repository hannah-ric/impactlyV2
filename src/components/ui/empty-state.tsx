import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-2xl", className)}>
      <div className="w-20 h-20 mx-auto mb-lg bg-[var(--bg-secondary)] rounded-full grid place-items-center text-3xl animate-empty-bounce">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-sm">
        {title}
      </h3>
      <p className="text-base text-[var(--text-secondary)] max-w-md mx-auto mb-md">
        {description}
      </p>

      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}
