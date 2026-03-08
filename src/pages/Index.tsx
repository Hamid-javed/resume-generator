import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import FooterSection from '@/components/landing/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TemplateShowcase />
      <FooterSection />
    </div>
  );
};

export default Index;
