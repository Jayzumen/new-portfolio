import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import SectionHeading from "./section-heading";
import mintflux from "../../public/mintflux.jpg";
import cinescope from "../../public/cinescope.jpg";
import carrental from "../../public/carrental.jpg";
import pokefans from "../../public/pokefans.jpg";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: StaticImageData;
};

const projects: Project[] = [
  {
    title: "MindFlux",
    description:
      "A finance tracker website built with Next.js, TypeScript and Tailwind",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Firebase", "Shadcn"],
    github: "https://github.com/Jayzumen/MintFlux",
    demo: "https://mintflux.netlify.app/",
    image: mintflux,
  },
  {
    title: "CineScope",
    description: "A Website for searching the latest movies and TV-shows.",
    tech: ["React", "Next.js", "TailwindCSS", "TMDB API", "Firebase"],
    github: "https://github.com/Jayzumen/CineScope",
    demo: "https://cinescope-jn.netlify.app/",
    image: cinescope,
  },
  {
    title: "CarRental",
    description:
      "This is a car rental website built with Next.js, TypeScript and Tailwind.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL"],
    github: "https://github.com/Jayzumen/CarRental",
    demo: "https://car-rental-jayzumen.vercel.app/",
    image: carrental,
  },
  {
    title: "Pokefans",
    description:
      "A Pokedex Website. Built with Next.js, TypeScript and Tailwind.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "PokeAPI", "Firebase"],
    github: "https://github.com/Jayzumen/Pokefans",
    demo: "https://pokefans.vercel.app/",
    image: pokefans,
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="reveal group bg-card hover:border-foreground/20 flex h-full flex-col overflow-hidden rounded-2xl border shadow-xs transition-[border-color,box-shadow] duration-300 hover:shadow-xl">
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="bg-muted relative block aspect-video overflow-hidden border-b"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          placeholder="blur"
          sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </a>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <span className="text-muted-foreground font-mono text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 font-mono text-[11px] font-medium"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-6">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
              GitHub
            </a>
          </Button>
          <Button asChild size="sm" className="group/btn rounded-full">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live Demo
              <ArrowUpRight className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcaseSection() {
  return (
    <section
      id="projects"
      aria-label="Project showcase section"
      className="py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Projects"
          title="Projects"
          description="Some Projects i built:"
        />
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
