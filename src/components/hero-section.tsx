"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className={`bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-2 text-center transition-opacity duration-1000 md:p-0 ${visible ? "animate-fade-in opacity-100" : "opacity-0"}`}
      aria-label="Hero section"
    >
      <span className="text-accent-foreground mb-2 text-base font-semibold md:text-lg">
        Hey, my name is
      </span>
      <h1 className="from-primary mb-2 text-5xl font-extrabold tracking-tight drop-shadow-lg md:text-7xl">
        Jan-Niklas Reinhardt
      </h1>
      <span className="text-accent-foreground mb-4 text-xl font-semibold md:text-2xl">
        I craft digital experiences as a software developer
      </span>
      <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-lg md:text-xl">
        Passionate about building fast, accessible, and beautiful web
        applications with Next.js, React, and TypeScript. Let&apos;s create
        something amazing together.
      </p>
      <Button size="lg" className="button-cta px-8 py-4 text-lg" asChild>
        <a href="#projects">View My Work</a>
      </Button>
    </section>
  );
}
