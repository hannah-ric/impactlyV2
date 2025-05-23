import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    container: "py-6",
    icon: "h-8 w-8",
    title: "text-base",
    description: "text-sm",
  },
  md: {
    container: "py-12",
    icon: "h-12 w-12",
    title: "text-lg",
    description: "text-sm",
  },
  lg: {
    container: "py-16",
    icon: "h-16 w-16",
    title: "text-xl",
    description: "text-base",
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}) => {
  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        classes.container,
        className,
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon className={cn("text-muted-foreground", classes.icon)} />
        </div>
      )}
      <h3 className={cn("font-semibold text-foreground mb-2", classes.title)}>
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "text-muted-foreground mb-6 max-w-md",
            classes.description,
          )}
        >
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant={action.variant || "default"}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

// Card wrapper for empty states
export const EmptyStateCard: React.FC<EmptyStateProps> = (props) => {
  return (
    <Card>
      <CardContent>
        <EmptyState {...props} />
      </CardContent>
    </Card>
  );
};
