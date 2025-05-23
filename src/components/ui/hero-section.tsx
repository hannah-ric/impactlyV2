import React from "react";
import { Button } from "./button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  emoji?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function HeroSection({
  title,
  subtitle,
  emoji = "👋",
  primaryAction,
  secondaryAction,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/90 to-accent/90 rounded-2xl p-2xl mb-xl overflow-hidden text-white animate-hero-glow">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-white/20 rounded-full top-[-100px] right-[-100px] filter blur-[40px] opacity-50 animate-orb-float"></div>
        <div className="absolute w-[200px] h-[200px] bg-accent/30 rounded-full bottom-[-50px] left-[10%] filter blur-[40px] opacity-50 animate-orb-float animation-delay-[-5s]"></div>
        <div className="absolute w-[150px] h-[150px] bg-primary/30 rounded-full top-[50%] right-[20%] filter blur-[40px] opacity-50 animate-orb-float animation-delay-[-10s]"></div>
      </div>

      <div className="relative z-1 max-w-[600px]">
        <div className="text-4xl mb-sm inline-block animate-wave origin-[70%_70%]">
          {emoji}
        </div>
        <h1 className="text-4xl font-extrabold mb-sm animate-fade-in-up">
          {title}
        </h1>
        <p className="text-lg opacity-90 mb-lg animate-fade-in-up animation-delay-[0.1s]">
          {subtitle}
        </p>

        <div className="flex flex-wrap gap-sm animate-fade-in-up animation-delay-[0.2s]">
          {primaryAction && (
            <Button
              className="bg-white text-primary shadow-md hover:translate-y-[-2px] hover:shadow-lg transition-all duration-normal ease-out"
              onClick={primaryAction.onClick}
            >
              <Play className="h-4 w-4 mr-2" />
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant="outline"
              className="bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:border-white/30"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
