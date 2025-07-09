import AboutSection from "@/components/about-section";
import TechStackSection from "@/components/tech-stack-section";
import ProjectShowcaseSection from "@/components/project-showcase-section";
import ContactSection from "@/components/contact-section";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-24">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectShowcaseSection />
        <ContactSection />
      </main>
    </>
  );
}
