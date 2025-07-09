"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-background/80 border-border animate-fade-in sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#hero"
          className="text-primary text-xl font-bold tracking-tight"
        >
          JN
        </a>
        {/* Desktop nav links */}
        <div className="hidden gap-2 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              size="sm"
              className="hover:bg-accent/60 focus-visible:ring-accent px-3 text-base font-medium focus-visible:ring-2"
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
          <ModeToggle />
        </div>
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <ModeToggle />
          </div>
          <button
            className="text-primary flex items-center px-2 py-1 focus:outline-none md:hidden"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="Open menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="border-border animate-fade-in absolute top-full right-4 z-50 mt-2 w-48 rounded-lg border bg-neutral-900 text-white shadow-lg md:hidden dark:bg-neutral-900"
          >
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent hover:bg-accent/20 rounded px-2 py-2 text-base font-medium transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
