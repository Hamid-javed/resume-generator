import { ResumeData } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans text-[11px] leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1a1a1a' }}>
      {/* Header */}
      {personalInfo.fullName && (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1a1a1a' }}>{personalInfo.fullName}</h1>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px]" style={{ color: '#666' }}>
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          </div>
          <div className="flex items-center justify-center gap-4 mt-1 text-[10px]" style={{ color: '#666' }}>
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
            {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</span>}
            {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.portfolio}</span>}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t mb-5" style={{ borderColor: '#e5e5e5' }} />

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#3B82F6' }}>Summary</h2>
          <p style={{ color: '#444' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#3B82F6' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold" style={{ color: '#1a1a1a' }}>{exp.jobTitle}</span>
                  {exp.company && <span style={{ color: '#666' }}> · {exp.company}</span>}
                </div>
                <span className="text-[10px] shrink-0" style={{ color: '#999' }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
              </div>
              {exp.bullets.filter(b => b).length > 0 && (
                <ul className="mt-1 ml-4 list-disc" style={{ color: '#444' }}>
                  {exp.bullets.filter(b => b).map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#3B82F6' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold" style={{ color: '#1a1a1a' }}>{edu.degree}</span>
                  {edu.institution && <span style={{ color: '#666' }}> · {edu.institution}</span>}
                </div>
                <span className="text-[10px] shrink-0" style={{ color: '#999' }}>{edu.graduationYear}</span>
              </div>
              {edu.gpa && <p className="text-[10px]" style={{ color: '#666' }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#3B82F6' }}>Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                {skill.name || 'Skill'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  return (
    <div className="text-[11px] leading-relaxed" style={{ fontFamily: "Georgia, serif", color: '#1a1a1a' }}>
      {/* Header */}
      <div className="px-8 py-6" style={{ background: '#1E293B' }}>
        {personalInfo.fullName && (
          <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#fff' }}>{personalInfo.fullName}</h1>
        )}
        <div className="flex gap-4 mt-2 text-[10px]" style={{ color: '#94A3B8' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: '#1E293B', borderColor: '#1E293B' }}>Professional Summary</h2>
            <p style={{ color: '#444' }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: '#1E293B', borderColor: '#1E293B' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <strong style={{ color: '#1E293B' }}>{exp.jobTitle}</strong>
                  <span className="text-[10px]" style={{ color: '#999' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p className="italic" style={{ color: '#666' }}>{exp.company}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1 ml-4 list-disc" style={{ color: '#444' }}>
                    {exp.bullets.filter(b => b).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: '#1E293B', borderColor: '#1E293B' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <strong style={{ color: '#1E293B' }}>{edu.degree}</strong>
                {edu.institution && <span style={{ color: '#666' }}> — {edu.institution}</span>}
                {edu.graduationYear && <span style={{ color: '#999' }}> ({edu.graduationYear})</span>}
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: '#1E293B', borderColor: '#1E293B' }}>Skills</h2>
            <p style={{ color: '#444' }}>{skills.map(s => s.name).filter(Boolean).join(' · ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const BoldTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  return (
    <div className="flex text-[11px] leading-relaxed min-h-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar */}
      <div className="w-[35%] p-6" style={{ background: '#7C3AED', color: '#fff' }}>
        {personalInfo.fullName && (
          <h1 className="text-xl font-bold mb-4">{personalInfo.fullName}</h1>
        )}
        <div className="space-y-1 text-[10px] mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p>{personalInfo.github}</p>}
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span className="text-[10px]">{skill.name}</span>
                  <div className="w-full h-1 rounded-full mt-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <div className="h-1 rounded-full" style={{
                      background: '#fff',
                      width: skill.level === 'expert' ? '100%' : skill.level === 'intermediate' ? '66%' : '33%'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mt-6">
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 text-[10px]">
                <p className="font-semibold">{edu.degree}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{edu.institution}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 p-6" style={{ color: '#1a1a1a' }}>
        {summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#7C3AED' }}>About Me</h2>
            <p style={{ color: '#444' }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#7C3AED' }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-3" style={{ borderLeft: '2px solid #7C3AED' }}>
                <div className="flex justify-between">
                  <strong>{exp.jobTitle}</strong>
                  <span className="text-[10px]" style={{ color: '#999' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p style={{ color: '#7C3AED' }}>{exp.company}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1 ml-3 list-disc" style={{ color: '#444' }}>
                    {exp.bullets.filter(b => b).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const DeveloperTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-[11px] leading-relaxed" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: '#E2E8F0', background: '#0F172A' }}>
      {/* Header */}
      {personalInfo.fullName && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#10B981' }}>
            {'> '}{personalInfo.fullName}
          </h1>
          <div className="flex gap-3 mt-2 text-[10px]" style={{ color: '#64748B' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      )}

      {summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold mb-2" style={{ color: '#10B981' }}>## Summary</h2>
          <p style={{ color: '#94A3B8' }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold mb-3" style={{ color: '#10B981' }}>## Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3 pl-3" style={{ borderLeft: '2px solid #10B981' }}>
              <div className="flex justify-between">
                <span style={{ color: '#E2E8F0' }}>{exp.jobTitle} <span style={{ color: '#64748B' }}>@ {exp.company}</span></span>
                <span className="text-[10px]" style={{ color: '#475569' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
              </div>
              {exp.bullets.filter(b => b).length > 0 && (
                <ul className="mt-1 ml-3" style={{ color: '#94A3B8' }}>
                  {exp.bullets.filter(b => b).map((b, i) => <li key={i}>- {b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold mb-2" style={{ color: '#10B981' }}>## Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-1">
              <span style={{ color: '#E2E8F0' }}>{edu.degree}</span>
              <span style={{ color: '#64748B' }}> — {edu.institution} ({edu.graduationYear})</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold mb-2" style={{ color: '#10B981' }}>## Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 rounded text-[10px]" style={{ background: '#1E293B', color: '#10B981', border: '1px solid #10B981' }}>
                {skill.name || 'skill'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
