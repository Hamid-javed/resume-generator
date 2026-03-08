import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { analyzeATS, ATSAnalysis } from '@/lib/ai';
import { toast } from 'sonner';

const ATSPanel = () => {
  const data = useResumeStore((s) => s.data);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeATS(data, jobDescription || undefined);
      setAnalysis(result);
    } catch (e: any) {
      toast.error(e.message || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="w-8 h-8 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-500" />;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground font-sans">ATS Compatibility Score</h3>
      <p className="text-sm text-muted-foreground">
        Analyze your resume for ATS compatibility. Optionally paste a job description for keyword matching.
      </p>

      <Textarea
        placeholder="Paste a job description here (optional) to check keyword match..."
        className="min-h-[100px]"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <Button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full gradient-electric text-primary-foreground"
      >
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </Button>

      {analysis && (
        <div className="space-y-4 animate-fade-in">
          {/* Score */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
            {getScoreIcon(analysis.score)}
            <div>
              <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}/100
              </div>
              <p className="text-sm text-muted-foreground">
                {analysis.score >= 80 ? 'Excellent ATS compatibility' : analysis.score >= 60 ? 'Good, but could improve' : 'Needs improvement'}
              </p>
            </div>
          </div>

          {/* Score bar */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${analysis.score}%`,
                background: analysis.score >= 80 ? '#16a34a' : analysis.score >= 60 ? '#ca8a04' : '#ef4444'
              }}
            />
          </div>

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Strengths
              </h4>
              <ul className="space-y-1">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvements */}
          {analysis.improvements.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-yellow-600" /> Improvements
              </h4>
              <ul className="space-y-1">
                {analysis.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Keywords */}
          {analysis.missingKeywords.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Missing Keywords</h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-destructive/10 text-destructive">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSPanel;
