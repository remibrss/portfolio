import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import EducationSection from '@/components/education-section';
import SkillsSection from '@/components/skills-section';
import CertificationsSection from '@/components/certifications-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <CertificationsSection />
      <Footer />
    </div>
  );
}
