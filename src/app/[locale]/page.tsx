import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ApproachSection } from "@/sections/ApproachSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { ContactSection } from "@/sections/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
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
