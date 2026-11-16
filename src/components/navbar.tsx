"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = useState<string>("#hero");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

export default function Navbar() {
  const active = useActiveSection();
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/75 border-border backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between"
      >
        <a
          href="#hero"
          className="group flex items-center gap-2 font-semibold tracking-tight"
          aria-label="JN – back to top"
        >
          <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg font-mono text-sm transition-transform group-hover:-rotate-6">
            JN
          </span>
        </a>

        <ul className="bg-background/60 hidden items-center gap-1 rounded-full border p-1 shadow-xs backdrop-blur md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-visible:ring-ring/50 block rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="font-mono text-sm">JN</SheetTitle>
              <ul className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                          active === link.href
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
