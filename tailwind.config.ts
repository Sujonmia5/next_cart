import type { Config } from "tailwindcss";

const config: Config = {
  // ── Always light — darkMode class present but overridden in CSS ──────
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Color Tokens ─────────────────────────────────────────────────
      colors: {
        // shadcn semantic tokens (CSS-variable backed)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // ── Nex_Cart Brand Palette (exact spec) ───────────────────────
        // accent  = #5B4FFF electric violet (primary brand)
        accent: {
          DEFAULT: "#5B4FFF",
          hover:   "#4A3EEE",
          light:   "#EAE8FF",
        },
        // secondary = #00D4AA teal-green
        secondary: {
          DEFAULT: "#00D4AA",
          foreground: "#FFFFFF",
        },
        // warm = #FF6B4A coral / sale badges
        warm: {
          DEFAULT: "#FF6B4A",
          foreground: "#FFFFFF",
        },
        // ink scale — dark text hierarchy
        ink: {
          DEFAULT: "#0A0A0F",
          2: "#2E2E3A",
          3: "#6B6B80",
          4: "#9999AE",
        },
        // surface scale — light background hierarchy
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#F6F6FB",
          3: "#EDEDF5",
        },
      },

      // ── Border Radius System (exact spec) ──────────────────────────
      borderRadius: {
        none:    "0",
        sm:      "8px",   // tags / small chips
        md:      "12px",  // cards
        lg:      "16px",  // large cards / panels
        xl:      "24px",  // modals / auth sheets
        "2xl":   "32px",  // hero sections / drawers
        full:    "9999px", // pills / buttons
        // shadcn internal aliases
        DEFAULT: "8px",
      },

      // ── Spacing Scale ───────────────────────────────────────────────
      // 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px
      spacing: {
        "0.5": "0.125rem",  // 2px
        "1":   "0.25rem",   // 4px  ← scale base
        "2":   "0.5rem",    // 8px
        "3":   "0.75rem",   // 12px
        "4":   "1rem",      // 16px
        "6":   "1.5rem",    // 24px
        "8":   "2rem",      // 32px
        "12":  "3rem",      // 48px
        "16":  "4rem",      // 64px
        "20":  "5rem",
        "24":  "6rem",
        "32":  "8rem",
        "40":  "10rem",
        "48":  "12rem",
        "64":  "16rem",
      },

      // ── Typography ──────────────────────────────────────────────────
      fontFamily: {
        // Spec keys: head = Syne (headings/display), body = DM Sans (UI/body)
        head: ["Syne", "var(--font-heading)", "sans-serif"],
        body: ["DM Sans", "var(--font-sans)", "sans-serif"],
        // Tailwind default aliases kept for shadcn compatibility
        sans: ["DM Sans", "var(--font-sans)", "sans-serif"],
        heading: ["Syne", "var(--font-heading)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      fontSize: {
        xs:   ["0.75rem",  { lineHeight: "1rem" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem",     { lineHeight: "1.5rem" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",   { lineHeight: "2rem" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
        "5xl":["3rem",     { lineHeight: "1" }],
        "6xl":["3.75rem",  { lineHeight: "1" }],
        "7xl":["4.5rem",   { lineHeight: "1" }],
        "8xl":["6rem",     { lineHeight: "1" }],
      },

      fontWeight: {
        light:       "300",
        normal:      "400",
        medium:      "500",
        semibold:    "600",
        bold:        "700",
        extrabold:   "800",
      },

      // ── Shadows (exact spec) ─────────────────────────────────────────
      boxShadow: {
        // Spec-defined named shadows
        accent: "0 8px 32px rgba(91,79,255,0.25)",  // violet glow — CTAs
        card:   "0 4px 16px rgba(10,10,15,0.08)",   // subtle lift — cards
        // Standard utility shadows
        xs:      "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm:      "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        DEFAULT: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        md:      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg:      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl:      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl":   "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner:   "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none:    "none",
      },

      // ── Animation ───────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-in":         "fade-in 0.3s ease-out",
        "slide-in-right":  "slide-in-right 0.25s ease-out",
        "scale-in":        "scale-in 0.2s ease-out",
        shimmer:           "shimmer 2s linear infinite",
      },

      // ── Transitions ─────────────────────────────────────────────────
      transitionDuration: {
        DEFAULT: "200ms",
        fast:    "100ms",
        normal:  "200ms",
        slow:    "300ms",
      },
      transitionTimingFunction: {
        DEFAULT:   "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
