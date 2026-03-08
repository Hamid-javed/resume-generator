import { ArrowRight, FileText, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gradient-hero relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-electric/10 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-electric/5 blur-3xl" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm font-medium text-electric-light">AI-Powered Resume Builder</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Build a Resume That
            <span className="text-gradient block mt-2">Gets You Hired</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Create professional, ATS-optimized resumes in minutes. Choose from stunning templates, get AI-powered suggestions, and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="gradient-electric text-primary-foreground glow-blue text-lg px-8 py-6 font-semibold"
              onClick={() => navigate('/builder/new')}
            >
              Build My Resume
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
              onClick={() => navigate('/templates')}
            >
              Browse Templates
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: FileText, label: '12+ Templates' },
              { icon: Zap, label: 'ATS-Optimized' },
              { icon: Sparkles, label: 'AI-Powered' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-electric-light" />
                </div>
                <span className="text-sm text-primary-foreground/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
