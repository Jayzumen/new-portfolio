import { FaGithub, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jan-niklas-reinhardt/",
    icon: <FaLinkedin className="h-5 w-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Jayzumen",
    icon: <FaGithub className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-background/80 border-border mt-16 border-t shadow-inner">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary px-2 text-base font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="text-muted-foreground text-center text-xs md:text-right">
          © {new Date().getFullYear()} JN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
