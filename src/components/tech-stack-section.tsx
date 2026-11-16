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
import SectionHeading from "./section-heading";

const techStack = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "ShadCN UI", icon: SiShadcnui, color: "currentColor" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", icon: SiPrisma, color: "currentColor" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
];

export default function TechStackSection() {
  return (
    <section
      id="tech"
      aria-label="Tech stack section"
      className="bg-muted/40 border-y py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading index="02" label="Tech" title="Tech Stack" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {techStack.map(({ name, icon: Icon, color }) => (
            <li
              key={name}
              style={{ "--tech-color": color } as React.CSSProperties}
              className="reveal group bg-card hover:border-foreground/20 flex flex-col items-center gap-4 rounded-xl border px-4 py-8 shadow-xs transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                aria-hidden
                className="text-muted-foreground size-10 transition-colors duration-300 group-hover:text-(--tech-color)"
              />
              <span className="text-sm font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
