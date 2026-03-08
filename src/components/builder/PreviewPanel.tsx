import { useResumeStore, TemplateId } from '@/store/resumeStore';
import { MinimalTemplate, ExecutiveTemplate, BoldTemplate, DeveloperTemplate } from './ResumeTemplates';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { ATSClassicTemplate } from './templates/ATSClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';

const templateMap: Record<TemplateId, React.FC<any>> = {
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  bold: BoldTemplate,
  developer: DeveloperTemplate,
  corporate: CorporateTemplate,
  'ats-classic': ATSClassicTemplate,
  creative: CreativeTemplate,
  'two-column': TwoColumnTemplate,
};

const templateNames: Record<TemplateId, string> = {
  minimal: 'Minimal',
  executive: 'Executive',
  bold: 'Bold',
  developer: 'Developer',
  corporate: 'Corporate',
  'ats-classic': 'ATS Classic',
  creative: 'Creative',
  'two-column': 'Two-Column',
};

const PreviewPanel = () => {
  const { data, templateId, setTemplateId } = useResumeStore();
  const Template = templateMap[templateId];

  return (
    <div className="h-full flex flex-col bg-muted/50">
      {/* Template selector */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-card">
        <span className="text-xs text-muted-foreground font-medium">Template:</span>
        {(Object.keys(templateMap) as TemplateId[]).map((id) => (
          <button
            key={id}
            onClick={() => setTemplateId(id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              templateId === id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            {templateNames[id]}
          </button>
        ))}
      </div>

      {/* Resume preview */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <div
          id="resume-preview"
          className="bg-card shadow-xl rounded-sm w-full max-w-[595px] min-h-[842px] overflow-hidden"
          style={{ aspectRatio: '595/842' }}
        >
          <Template data={data} />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
