"use client";
import { useEffect, useRef, useState } from "react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiShadcnui,
  SiMysql,
  SiPrisma,
  SiPhp,
  SiPostgresql,
  SiJavascript,
} from "react-icons/si";

const techStack = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "ShadCN UI", icon: SiShadcnui },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
  { name: "PHP", icon: SiPhp },
];

export default function TechStackSection() {
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
      id="tech"
      className="bg-background py-16"
      aria-label="Tech stack section"
    >
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-3xl font-semibold">Tech Stack</h2>
        <div
          ref={ref}
          className={`grid grid-cols-2 items-center justify-center gap-8 transition-opacity duration-1000 sm:grid-cols-3 md:grid-cols-5 ${visible ? "animate-fade-in opacity-100" : "opacity-0"}`}
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="tech-hover flex flex-col items-center gap-2"
            >
              <tech.icon className="h-12 w-12" />
              <span className="text-muted-foreground text-base">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
