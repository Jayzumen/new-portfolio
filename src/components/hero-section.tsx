import { ArrowDown, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "./ui/button";
import { socialLinks } from "@/lib/site";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden pt-16"
    >
      {/* Decorative background */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black_30%,transparent_100%)] opacity-60"
      />
      <div
        aria-hidden
        className="bg-brand/25 dark:bg-brand/15 absolute top-1/4 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full blur-[120px]"
      />

      <div className="container-page py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-enter text-muted-foreground bg-background/60 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium shadow-xs backdrop-blur">
            <span className="relative flex size-2">
              <span className="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-60" />
              <span className="bg-success relative inline-flex size-2 rounded-full" />
            </span>
            Hey, my name is
          </p>

          <h1 className="animate-enter text-gradient pb-2 text-5xl font-bold tracking-tighter text-balance [animation-delay:80ms] sm:text-6xl md:text-7xl lg:text-8xl">
            Jan-Niklas Reinhardt
          </h1>

          <p className="animate-enter mt-6 text-xl font-medium tracking-tight text-balance [animation-delay:160ms] md:text-2xl">
            I craft digital experiences as a software developer
          </p>

          <p className="animate-enter text-muted-foreground mx-auto mt-5 max-w-2xl text-lg text-pretty [animation-delay:240ms] md:text-xl">
            Passionate about building fast, accessible, and beautiful web
            applications with Next.js, React, and TypeScript. Let&apos;s create
            something amazing together.
          </p>

          <div className="animate-enter mt-10 flex flex-wrap items-center justify-center gap-3 [animation-delay:320ms]">
            <Button
              size="lg"
              className="group h-12 rounded-full px-7 text-base"
              asChild
            >
              <a href="#projects">
                View My Work
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-12 rounded-full"
              asChild
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="size-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-12 rounded-full"
              asChild
            >
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="size-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="text-muted-foreground hover:text-foreground absolute bottom-8 left-1/2 hidden -translate-x-1/2 rounded-full border p-2 transition-colors md:block"
      >
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
