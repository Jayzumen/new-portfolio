import { FaGithub, FaLinkedin } from "react-icons/fa";
import SectionHeading from "./section-heading";
import ContactForm from "./contact-form";
import { socialLinks } from "@/lib/site";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="bg-muted/40 border-t py-24 md:py-32"
    >
      <div className="container-page grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24">
        <div>
          <SectionHeading
            index="04"
            label="Contact"
            title="Contact"
            className="mb-8 md:mb-8"
          />
          <ul className="reveal flex flex-col gap-3">
            <li>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card hover:border-foreground/20 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-xs transition-colors"
              >
                <FaLinkedin className="size-5 text-[#0A66C2]" aria-hidden />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card hover:border-foreground/20 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-xs transition-colors"
              >
                <FaGithub className="size-5" aria-hidden />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="reveal bg-card rounded-2xl border p-6 shadow-sm md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
