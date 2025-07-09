"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="bg-background flex w-full justify-center px-2 py-12 md:p-0"
      aria-label="About section"
    >
      <Card
        ref={ref}
        className={`card-hover flex w-full max-w-3xl flex-col items-center gap-8 p-8 shadow-lg transition-opacity duration-1000 md:flex-row ${visible ? "animate-fade-in opacity-100" : "opacity-0"}`}
      >
        <Avatar className="size-32 md:size-60">
          <AvatarImage
            src="/jn.jpg"
            alt="JN profile photo"
            className="h-full w-full object-cover object-[50%_5%]"
          />
          <AvatarFallback>JN</AvatarFallback>
        </Avatar>
        <CardContent className="flex-1 text-center md:text-left">
          <h2 className="mb-2 text-3xl font-semibold">About Me</h2>
          <p className="text-muted-foreground text-lg">
            I’m Jan-Niklas, a passionate web developer specializing in building
            fast, accessible, and beautiful web applications with modern
            technologies. I love crafting seamless user experiences and elegant
            interfaces.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
