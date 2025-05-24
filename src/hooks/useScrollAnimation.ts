import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element is visible in the viewport and apply animations
 * @param threshold - Percentage of element that must be visible (0-1)
 * @param rootMargin - Margin around the root element
 * @param once - Whether to trigger animation only once (default: true)
 * @returns Object with ref to attach to element and isVisible state
 */
export function useScrollAnimation(
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once element has been visible, we can stop observing it if once is true
          if (once && ref.current && observerRef.current) {
            observerRef.current.unobserve(ref.current);
          }
        } else if (!once) {
          // If not once, toggle visibility state
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    const currentRef = ref.current;
    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      // Proper cleanup on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
