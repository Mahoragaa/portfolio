import { SiteShell } from "@/components/site-shell";
import { Hero } from "@/components/hero";
import { HeroCanvas } from "@/components/hero-canvas";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { SkillGraph } from "@/components/skill-graph";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  "use cache";
  return (
    <SiteShell>
      <main id="main-content" className="flex-1">
        {/* Section Order (Rule 9): Hero -> Projects -> Experience -> Skills -> Education & certs -> Contact */}
        <Hero canvasSlot={<HeroCanvas />} />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection graphSlot={<SkillGraph />} />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </SiteShell>
  );
}
