import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Calendar, ChevronRight } from "lucide-react";

type TaskPriority = "high" | "medium" | "low";
type TaskStatus = "not-started" | "in-progress" | "completed" | "blocked";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

export function TaskCard({
  title,
  description,
  dueDate,
  priority,
  status,
  onAction,
  actionLabel = "Continue",
  className,
}: TaskCardProps) {
  const statusLabels: Record<TaskStatus, string> = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",
    blocked: "Blocked",
  };

  const statusVariants: Record<
    TaskStatus,
    "default" | "outline" | "secondary" | "destructive"
  > = {
    "not-started": "default",
    "in-progress": "secondary",
    completed: "outline",
    blocked: "destructive",
  };

  return (
    <div
      className={cn(
        "relative bg-[var(--bg-elevated)] border-2 border-[var(--border-secondary)] rounded-xl p-lg transition-all duration-normal ease-out cursor-pointer overflow-hidden hover:translate-x-2 hover:shadow-lg hover:border-transparent",
        `before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:transition-width before:duration-fast before:ease-out hover:before:w-2`,
        priority === "high" && "before:bg-danger task-card--high",
        priority === "medium" && "before:bg-warning task-card--medium",
        priority === "low" && "before:bg-primary task-card--low",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-md mb-sm">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-md leading-relaxed">
            {description}
          </p>
        </div>
        <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
      </div>

      <div className="flex items-center justify-between gap-md">
        <div className="flex items-center gap-xs text-xs text-[var(--text-tertiary)]">
          <Calendar className="h-4 w-4" />
          Due {dueDate}
        </div>

        {onAction && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAction}
            className="text-sm font-semibold text-primary flex items-center gap-xs transition-all duration-fast ease-out hover:gap-sm"
          >
            {actionLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
