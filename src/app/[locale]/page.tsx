import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ApproachSection } from "@/sections/ApproachSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { ContactSection } from "@/sections/ContactSection";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <ApproachSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
