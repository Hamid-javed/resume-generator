import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Trash2, Copy, LogOut, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';

interface Resume {
  id: string;
  title: string;
  template_id: string;
  content: Json;
  updated_at: string;
  created_at: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      toast.error('Failed to load resumes');
    } else {
      setResumes(data || []);
    }
    setLoading(false);
  };

  const createResume = async () => {
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user!.id,
        title: 'Untitled Resume',
        template_id: 'minimal',
        content: {} as Json,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create resume');
    } else if (data) {
      navigate(`/builder/${data.id}`);
    }
  };

  const duplicateResume = async (resume: Resume) => {
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user!.id,
        title: `${resume.title} (copy)`,
        template_id: resume.template_id,
        content: resume.content,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to duplicate');
    } else {
      toast.success('Resume duplicated');
      fetchResumes();
    }
  };

  const deleteResume = async (id: string) => {
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Resume deleted');
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">ResumeForge</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
            <p className="text-muted-foreground text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</p>
          </div>
          <Button className="gradient-electric text-primary-foreground" onClick={createResume}>
            <Plus className="w-4 h-4 mr-1" /> New Resume
          </Button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
            <Button className="gradient-electric text-primary-foreground" onClick={createResume}>
              <Plus className="w-4 h-4 mr-1" /> Create Resume
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => navigate(`/builder/${resume.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => duplicateResume(resume)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => deleteResume(resume.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{resume.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Last edited {new Date(resume.updated_at).toLocaleDateString()}
                </p>
                <div className="mt-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">
                    {resume.template_id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
