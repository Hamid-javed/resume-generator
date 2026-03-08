import { FileText } from 'lucide-react';

const FooterSection = () => (
  <footer className="gradient-hero py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-electric" />
          <span className="text-lg font-bold text-primary-foreground">ResumeForge</span>
        </div>
        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} ResumeForge. Build resumes that get you hired.
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
