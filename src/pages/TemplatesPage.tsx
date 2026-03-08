import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResumeStore, TemplateId } from '@/store/resumeStore';

const templates: { id: TemplateId; name: string; category: string; color: string; description: string }[] = [
  { id: 'minimal', name: 'Minimal', category: 'Modern', color: '#3B82F6', description: 'Ultra-clean with lots of white space, thin lines, and sans-serif typography.' },
  { id: 'executive', name: 'Executive', category: 'Professional', color: '#1E293B', description: 'Classic dark navy header with serif fonts. Perfect for senior roles.' },
  { id: 'bold', name: 'Bold', category: 'Creative', color: '#7C3AED', description: 'Strong typography with a full color sidebar and geometric accents.' },
  { id: 'developer', name: 'Developer', category: 'Tech', color: '#10B981', description: 'Monospace accents, dark mode aesthetic. GitHub-inspired for tech roles.' },
];

const TemplatesPage = () => {
  const navigate = useNavigate();
  const setTemplateId = useResumeStore((s) => s.setTemplateId);

  const handleSelect = (id: TemplateId) => {
    setTemplateId(id);
    navigate('/builder/new');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center gap-3 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <FileText className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">ResumeForge</span>
        </div>
      </header>

      <div className="container py-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Choose a Template</h1>
        <p className="text-muted-foreground mb-10">Pick a design that matches your style and industry.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((t) => (
            <div
              key={t.id}
              className="group cursor-pointer"
              onClick={() => handleSelect(t.id)}
            >
              <div className="aspect-[3/4] rounded-xl border border-border bg-card overflow-hidden relative group-hover:border-primary/40 group-hover:shadow-xl transition-all duration-300">
                <div className="p-4 h-full flex flex-col">
                  <div className="h-10 rounded" style={{ background: t.color }} />
                  <div className="mt-3 space-y-2 flex-1">
                    <div className="h-3 w-3/4 rounded bg-foreground/10" />
                    <div className="h-2 w-1/2 rounded bg-foreground/5" />
                    <div className="mt-4 space-y-1.5">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-2 rounded bg-foreground/5" style={{ width: `${90 - j * 8}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/5">
                  <Button className="gradient-electric text-primary-foreground">Use This Template</Button>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.category}</span>
                <h3 className="text-base font-semibold text-foreground font-sans">{t.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
