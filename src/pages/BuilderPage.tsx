import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';

const BuilderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">ResumeForge</span>
          </div>
          <span className="text-sm text-muted-foreground ml-2">Untitled Resume</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Editor */}
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
