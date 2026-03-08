import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 'minimal', name: 'Minimal', category: 'Modern', color: '#3B82F6' },
  { id: 'executive', name: 'Executive', category: 'Professional', color: '#1E293B' },
  { id: 'bold', name: 'Bold', category: 'Creative', color: '#7C3AED' },
  { id: 'developer', name: 'Developer', category: 'Tech', color: '#10B981' },
];

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
          {templates.map((t, i) => (
            <div
              key={t.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => navigate('/builder/new')}
            >
              <div className="aspect-[3/4] rounded-xl border border-border bg-card overflow-hidden relative group-hover:border-electric/40 group-hover:shadow-xl transition-all duration-300">
                {/* Mock resume preview */}
                <div className="p-4 h-full flex flex-col">
                  <div className="h-8 rounded" style={{ background: t.color }} />
                  <div className="mt-3 space-y-2 flex-1">
                    <div className="h-3 w-3/4 rounded bg-foreground/10" />
                    <div className="h-2 w-1/2 rounded bg-foreground/5" />
                    <div className="mt-4 space-y-1.5">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-2 rounded bg-foreground/5" style={{ width: `${85 - j * 10}%` }} />
                      ))}
                    </div>
                    <div className="mt-4 h-2 w-1/3 rounded" style={{ background: t.color, opacity: 0.3 }} />
                    <div className="space-y-1.5">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-2 rounded bg-foreground/5" style={{ width: `${90 - j * 8}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-electric/0 group-hover:bg-electric/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
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
          ))}
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
