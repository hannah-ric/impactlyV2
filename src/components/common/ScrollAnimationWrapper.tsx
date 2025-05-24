import React, { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationEffect =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-rotate"
  | "none";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  effect?: AnimationEffect;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  once?: boolean; // Whether to trigger animation only once
}

/**
 * Component that wraps children and applies animations when they scroll into view
 */
export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  threshold = 0.1,
  rootMargin = "0px",
  animationClass = "animate-on-scroll",
  effect = "fade-up",
  delay = 0,
  duration = 600,
  once = true,
}) => {
  const { ref, isVisible } = useScrollAnimation(threshold, rootMargin, once);

  // Generate effect class based on the effect prop
  const getEffectClass = () => {
    if (effect === "none") return "";
    return `effect-${effect}`;
  };

  // Generate inline styles for delay and duration
  const animationStyle = {
    "--scroll-animation-delay": delay,
    transitionDuration: duration ? `${duration}ms` : undefined,
  } as React.CSSProperties;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        animationClass,
        getEffectClass(),
        isVisible && "visible",
        className,
      )}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
