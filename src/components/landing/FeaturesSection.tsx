import { Wand2, Layout, Download, Shield, Palette, Brain } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Writing Assistant', description: 'Get intelligent suggestions for bullet points, summaries, and skill recommendations tailored to your role.' },
  { icon: Layout, title: 'Professional Templates', description: '12+ beautifully crafted templates designed for every industry — from corporate to creative.' },
  { icon: Shield, title: 'ATS-Optimized', description: 'Every resume passes through ATS systems. Get a compatibility score and actionable improvement tips.' },
  { icon: Wand2, title: 'One-Click Tailoring', description: 'Paste a job description and instantly tailor your resume with matching keywords and phrasing.' },
  { icon: Download, title: 'Multi-Format Export', description: 'Export as pixel-perfect PDF, DOCX, or plain text. Print-ready in A4 or US Letter.' },
  { icon: Palette, title: 'Full Customization', description: 'Adjust colors, fonts, spacing, and section order. Make every resume uniquely yours.' },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Stand Out
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools that make resume building effortless and results impressive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-electric/30 hover:shadow-lg hover:shadow-electric/5 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-electric flex items-center justify-center mb-4 group-hover:glow-blue transition-shadow">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
