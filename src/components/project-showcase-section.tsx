"use client";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const projects = [
  {
    title: "CarRental",
    description:
      "This is a car rental website built with Next.js, TypeScript and Tailwind.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Jayzumen/CarRental",
    demo: "https://car-rental-jayzumen.vercel.app/",
    image: "/carrental.jpg",
  },
  {
    title: "CineScope",
    description: "A Website for searching the latest movies and TV-shows.",
    tech: ["React", "Next.js", "TailwindCSS", "TMDB API", "Firebase"],
    github: "https://github.com/Jayzumen/CineScope",
    demo: "https://cinescope.vercel.app/",
    image: "/cinescope.jpg",
  },
  {
    title: "Foodel",
    description:
      "A food Delivery Website. Built with Next.js, TypeScript and Stripe.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Stripe", "Prisma", "MySQL"],
    github: "https://github.com/Jayzumen/Foodel",
    demo: "https://foodel-jn.vercel.app/",
    image: "/foodel.jpg",
  },
  {
    title: "Pokefans",
    description:
      "A Pokedex Website. Built with Next.js, TypeScript and Tailwind.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "PokeAPI", "Firebase"],
    github: "https://github.com/Jayzumen/Pokefans",
    demo: "https://pokefans.vercel.app/",
    image: "/pokefans.jpg",
  },
];

export default function ProjectShowcaseSection() {
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
      id="projects"
      className="bg-background py-16"
      aria-label="Project showcase section"
    >
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-4 text-center text-3xl font-semibold">Projects</h2>
        <p className="text-accent-foreground mb-8 text-center font-semibold md:text-lg">
          Some Projects i built:
        </p>
        <div
          ref={ref}
          className={`grid gap-8 transition-opacity duration-1000 sm:grid-cols-2 ${visible ? "animate-fade-in opacity-100" : "opacity-0"}`}
        >
          {projects.map((project) => (
            <Card
              key={project.title}
              className="card-hover flex h-full flex-col"
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full rounded object-cover"
                    width={160}
                    height={160}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                )}
                <div className="my-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-accent text-accent-foreground rounded px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto gap-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
