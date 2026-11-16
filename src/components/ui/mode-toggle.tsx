"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const noopSubscribe = () => () => {};

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client, so expose state after hydration.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={hydrated ? isDark : undefined}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-input bg-secondary dark:bg-input/30 focus-visible:ring-ring/50 relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border p-0.5 shadow-xs transition-colors outline-none focus-visible:ring-[3px]"
    >
      {/* Track icons */}
      <Sun
        aria-hidden
        className="text-muted-foreground absolute left-1.5 size-3.5"
      />
      <Moon
        aria-hidden
        className="text-muted-foreground absolute right-1.5 size-3.5"
      />
      {/* Knob — position is driven by the `dark` class, so it is correct
          before hydration and never flashes. */}
      <span className="bg-background text-foreground relative z-10 grid size-6 place-items-center rounded-full shadow-sm ring-1 ring-black/5 transition-transform duration-300 ease-out dark:translate-x-6 dark:ring-white/10">
        <Sun aria-hidden className="size-3.5 dark:hidden" />
        <Moon aria-hidden className="hidden size-3.5 dark:block" />
      </span>
    </button>
  );
}
