import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MinimalTemplate, ExecutiveTemplate, BoldTemplate, DeveloperTemplate } from '@/components/builder/ResumeTemplates';
import { CorporateTemplate } from '@/components/builder/templates/CorporateTemplate';
import { ATSClassicTemplate } from '@/components/builder/templates/ATSClassicTemplate';
import { CreativeTemplate } from '@/components/builder/templates/CreativeTemplate';
import { TwoColumnTemplate } from '@/components/builder/templates/TwoColumnTemplate';
import { sampleResumeData } from '@/lib/sampleResumeData';
import { defaultStyles, TemplateId } from '@/store/resumeStore';

const templates: { id: TemplateId; name: string; category: string; color: string }[] = [
  { id: 'minimal', name: 'Minimal', category: 'Modern', color: '#3B82F6' },
  { id: 'executive', name: 'Executive', category: 'Professional', color: '#1E293B' },
  { id: 'bold', name: 'Bold', category: 'Creative', color: '#7C3AED' },
  { id: 'developer', name: 'Developer', category: 'Tech', color: '#10B981' },
];

const templateComponents: Record<TemplateId, React.FC<any>> = {
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  bold: BoldTemplate,
  developer: DeveloperTemplate,
  corporate: CorporateTemplate,
  'ats-classic': ATSClassicTemplate,
  creative: CreativeTemplate,
  'two-column': TwoColumnTemplate,
};

const templateStyles: Record<TemplateId, typeof defaultStyles> = {
  minimal: { ...defaultStyles, accentColor: '#3B82F6' },
  executive: { ...defaultStyles, accentColor: '#1E293B', headerBgColor: '#1E293B' },
  bold: { ...defaultStyles, accentColor: '#7C3AED' },
  developer: { ...defaultStyles, accentColor: '#10B981' },
  corporate: { ...defaultStyles, accentColor: '#0F4C81' },
  'ats-classic': { ...defaultStyles, accentColor: '#111827' },
  creative: { ...defaultStyles, accentColor: '#E11D48' },
  'two-column': { ...defaultStyles, accentColor: '#2563EB' },
};

const TemplateShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Templates That Impress
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated collection of professional templates, each optimized for ATS and visual impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t, i) => {
            const Template = templateComponents[t.id];
            const previewData = { ...sampleResumeData, styles: templateStyles[t.id] };
            return (
              <div
                key={t.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => navigate('/builder/new')}
              >
                <div className="aspect-[3/4] rounded-xl border border-border bg-card overflow-hidden relative group-hover:border-primary/40 group-hover:shadow-xl transition-all duration-300">
                  <div className="w-[595px] h-[842px] origin-top-left" style={{ transform: 'scale(0.32)', transformOrigin: 'top left' }}>
                    <Template data={previewData} />
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button size="sm" className="gradient-electric text-primary-foreground">
                      Use Template
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.category}</span>
                  <h3 className="text-sm font-semibold text-foreground font-sans">{t.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => navigate('/templates')}>
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
