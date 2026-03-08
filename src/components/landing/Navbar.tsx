import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <FileText className="w-6 h-6 text-electric" />
          <span className="text-lg font-bold text-primary-foreground">ResumeForge</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate('/templates')}>
            Templates
          </Button>
          <Button className="gradient-electric text-primary-foreground" onClick={() => navigate('/builder/new')}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
