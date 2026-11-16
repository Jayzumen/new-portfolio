import Image from "next/image";
import portrait from "../../public/jn.jpg";
import SectionHeading from "./section-heading";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About section"
      className="border-t py-24 md:py-32"
    >
      <div className="container-page grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:gap-24">
        <div className="reveal relative mx-auto w-full max-w-sm md:max-w-none">
          <div
            aria-hidden
            className="border-brand/30 absolute -inset-3 -z-10 translate-x-4 translate-y-4 rounded-3xl border"
          />
          <div className="bg-muted relative aspect-4/5 overflow-hidden rounded-2xl border shadow-xl">
            <Image
              src={portrait}
              alt="JN profile photo"
              fill
              placeholder="blur"
              sizes="(min-width: 1152px) 420px, (min-width: 768px) 40vw, 384px"
              className="object-cover object-[50%_15%]"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            index="01"
            label="About"
            title="About Me"
            className="mb-8 md:mb-8"
          />
          <p className="reveal text-muted-foreground text-lg leading-relaxed text-pretty md:text-xl md:leading-relaxed">
            I’m Jan-Niklas, a passionate web developer specializing in building
            fast, accessible, and beautiful web applications with modern
            technologies. I love crafting seamless user experiences and elegant
            interfaces.
          </p>
        </div>
      </div>
    </section>
  );
}
