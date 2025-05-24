/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "var(--color-accent-light)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        neutral: {
          0: "var(--neutral-0)",
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          950: "var(--neutral-950)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        glow: "var(--shadow-glow)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
      transitionTimingFunction: {
        "ease-out": "var(--ease-out)",
        "ease-in-out": "var(--ease-in-out)",
        "ease-elastic": "var(--ease-elastic)",
        "ease-bounce": "var(--ease-bounce)",
      },
      zIndex: {
        base: "var(--z-base)",
        elevated: "var(--z-elevated)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
        notification: "var(--z-notification)",
        tooltip: "var(--z-tooltip)",
      },
      backgroundImage: {
        "gradient-noise": "url('/noise-pattern.png')", // Add this line for the noise texture
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        backgroundShift: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "33%": { transform: "scale(1.05) rotate(3deg)" }, // Subtle rotation
          "66%": { transform: "scale(0.95) rotate(-3deg)" }, // Subtle rotation
        },
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideDown: {
          from: {
            opacity: "0",
            transform: "translateX(-50%) translateY(-20px)",
          },
        },
        slideInLeft: {
          from: {
            opacity: "0",
            transform: "translateX(-20px)",
          },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        logoPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        notificationPulse: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.8",
          },
        },
        avatarFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        badgeBounce: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-10px, 10px)" }, // Reduced movement
        },
        heroGlow: {
          from: { boxShadow: "var(--shadow-xl)" },
          to: { boxShadow: "var(--shadow-2xl), var(--shadow-glow)" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(15px, -15px) scale(1.05)" }, // Reduced movement
          "66%": { transform: "translate(-10px, 10px) scale(0.95)" }, // Reduced movement
        },
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%, 100%": { transform: "rotate(0deg)" },
        },
        trendBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        shimmer: {
          to: { transform: "translateX(100%)" },
        },
        aiPulse: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.5" },
          "50%": { transform: "scale(1.3) rotate(180deg)", opacity: "0.3" }, // Reduced scale
        },
        aiIconGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 hsla(var(--hue-primary), 80%, 60%, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 8px hsla(var(--hue-primary), 80%, 60%, 0)",
          },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0" }, // Reduced scale
        },
        emptyBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px) rotate(-3deg)" }, // Reduced movement
          "75%": { transform: "translateY(-5px) rotate(3deg)" }, // Reduced movement
        },
        skeletonWave: {
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "background-shift": "backgroundShift 3s ease-out", // Non-infinite version
        "fade-in-up": "fadeInUp 0.6s var(--ease-out) backwards",
        "slide-down": "slideDown 0.6s var(--ease-out)",
        "slide-in-left": "slideInLeft 0.6s var(--ease-out) 0.1s backwards",
        spin: "spin 3s linear", // Removed infinite
        "logo-pulse": "logoPulse 2s ease-in-out", // Removed infinite
        "notification-pulse": "notificationPulse 2s ease-in-out", // Removed infinite
        "avatar-float": "avatarFloat 3s ease-in-out", // Removed infinite
        "badge-bounce": "badgeBounce 2s ease-in-out", // Removed infinite
        float: "float 3s ease-in-out", // Removed infinite
        "hero-glow": "heroGlow 2s ease-in-out alternate", // Removed infinite
        "orb-float": "orbFloat 3s ease-in-out", // Removed infinite
        wave: "wave 1s ease-in-out", // Removed infinite
        "trend-bounce": "trendBounce 2s ease-in-out", // Removed infinite
        shimmer: "shimmer 2s", // Removed infinite
        "ai-pulse": "aiPulse 2s ease-in-out", // Removed infinite
        "ai-icon-glow": "aiIconGlow 2s ease-in-out", // Removed infinite
        pulse: "pulse 2s ease-in-out", // Removed infinite
        "empty-bounce": "emptyBounce 2s ease-in-out", // Removed infinite
        "skeleton-wave": "skeletonWave 1.5s", // Removed infinite
      },

      /* Add hover variants for animations */
      variants: {
        extend: {
          animation: ["hover", "group-hover"],
        },
      },
      backdropBlur: {
        md: "10px", // Slightly reduced blur
      },
      backdropSaturate: {
        120: "120%", // Reduced saturation
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
