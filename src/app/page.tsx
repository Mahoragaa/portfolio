import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  "use cache";
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Section Order (Rule 9): Hero -> Projects -> Experience -> Skills -> Education & certs -> Contact */}
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
