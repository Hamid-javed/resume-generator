import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, ArrowLeft, Download, Save, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import { useResumeStore } from '@/store/resumeStore';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';
import { exportResumePdf } from '@/lib/exportPdf';

const BuilderPage = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { loadResume, saveResume, resetStore, resumeTitle, saving, data, templateId } = useResumeStore();
  const [exporting, setExporting] = useState(false);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  // Load or create resume
  useEffect(() => {
    if (!user || authLoading) return;

    const init = async () => {
      if (resumeId === 'new') {
        // Create a new resume in DB
        const { data: newResume, error } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: 'Untitled Resume',
            template_id: 'minimal',
            content: {} as Json,
          })
          .select()
          .single();

        if (error || !newResume) {
          toast.error('Failed to create resume');
          navigate('/dashboard');
          return;
        }
        navigate(`/builder/${newResume.id}`, { replace: true });
      } else if (resumeId) {
        resetStore();
        await loadResume(resumeId);
      }
    };

    init();
  }, [resumeId, user, authLoading]);

  // Auto-save every 30 seconds
  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      const state = useResumeStore.getState();
      if (state.resumeId) {
        state.saveResume();
      }
    }, 30000);

    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, []);

  const handleManualSave = async () => {
    await saveResume();
    toast.success('Resume saved');
  };

  if (authLoading) {
    return <div className="h-screen flex items-center justify-center bg-background"><span className="text-muted-foreground">Loading...</span></div>;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">ResumeForge</span>
          </div>
          <input
            className="ml-2 text-sm bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none px-1 py-0.5 text-foreground"
            value={resumeTitle}
            onChange={(e) => useResumeStore.getState().setResumeTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleManualSave} disabled={saving}>
            {saving ? <Check className="w-4 h-4 mr-1" /> : <Save className="w-4 h-4 mr-1" />}
            {saving ? 'Saved' : 'Save'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export PDF
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-1/2 lg:w-[45%] border-r border-border overflow-hidden">
          <EditorPanel />
        </div>
        <div className="hidden md:block flex-1 overflow-hidden">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
