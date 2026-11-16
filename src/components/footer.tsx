import { FaGithub, FaLinkedin } from "react-icons/fa";
import { navLinks, socialLinks } from "@/lib/site";

const socials = [
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: <FaLinkedin className="size-5" />,
  },
  {
    label: "GitHub",
    href: socialLinks.github,
    icon: <FaGithub className="size-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <a
          href="#hero"
          aria-label="JN – back to top"
          className="bg-primary text-primary-foreground grid size-8 place-items-center self-center rounded-lg font-mono text-sm md:self-auto"
        >
          JN
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex items-center gap-2">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full p-2 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} JN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
