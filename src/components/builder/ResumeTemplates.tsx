import { ResumeData, ResumeStyles, defaultStyles } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { sampleResumeData } from '@/lib/sampleResumeData';

interface TemplateProps {
  data: ResumeData;
}

const getStyles = (data: ResumeData): ResumeStyles => data.styles || defaultStyles;

export const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return <MinimalTemplate data={sampleResumeData} />;
  }

  return (
    <div style={{ padding: s.pageMargin, fontFamily: `'${s.body.fontFamily}', sans-serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: s.body.color, background: s.backgroundColor }}>
      {/* Header */}
      {personalInfo.fullName && (
        <div className="text-center" style={{ marginBottom: s.sectionSpacing }}>
          <h1 style={{ fontFamily: `'${s.name.fontFamily}', sans-serif`, fontSize: s.name.fontSize, fontWeight: s.name.fontWeight as any, color: s.name.color, letterSpacing: s.name.letterSpacing, lineHeight: s.name.lineHeight }}>{personalInfo.fullName}</h1>
          <div className="flex items-center justify-center gap-4 mt-2" style={{ fontFamily: `'${s.contact.fontFamily}', sans-serif`, fontSize: s.contact.fontSize, color: s.contact.color }}>
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          </div>
          <div className="flex items-center justify-center gap-4 mt-1" style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>
            {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
            {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</span>}
            {personalInfo.portfolio && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.portfolio}</span>}
          </div>
        </div>
      )}

      <div className="border-t" style={{ borderColor: '#e5e5e5', marginBottom: s.sectionSpacing }} />

      {vis.summary && summary && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 className="uppercase tracking-widest" style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, letterSpacing: s.headings.letterSpacing, marginBottom: 8 }}>Summary</h2>
          <p style={{ color: s.body.color, fontWeight: s.body.fontWeight as any }}>{summary}</p>
        </div>
      )}

      {vis.experience && experience.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 className="uppercase tracking-widest" style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, letterSpacing: s.headings.letterSpacing, marginBottom: 12 }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold" style={{ color: s.name.color }}>{exp.jobTitle}</span>
                  {exp.company && <span style={{ color: s.contact.color }}> · {exp.company}</span>}
                </div>
                <span className="shrink-0" style={{ fontSize: s.contact.fontSize, color: '#999' }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
              </div>
              {exp.bullets.filter(b => b).length > 0 && (
                <ul className="mt-1 ml-4 list-disc" style={{ color: s.body.color }}>
                  {exp.bullets.filter(b => b).map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {vis.education && education.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 className="uppercase tracking-widest" style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, letterSpacing: s.headings.letterSpacing, marginBottom: 12 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-semibold" style={{ color: s.name.color }}>{edu.degree}</span>
                  {edu.institution && <span style={{ color: s.contact.color }}> · {edu.institution}</span>}
                </div>
                <span className="shrink-0" style={{ fontSize: s.contact.fontSize, color: '#999' }}>{edu.graduationYear}</span>
              </div>
              {edu.gpa && <p style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {vis.skills && skills.length > 0 && (
        <div>
          <h2 className="uppercase tracking-widest" style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, letterSpacing: s.headings.letterSpacing, marginBottom: 8 }}>Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 rounded font-medium" style={{ fontSize: s.contact.fontSize, background: s.accentColor + '15', color: s.accentColor }}>
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
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return <ExecutiveTemplate data={sampleResumeData} />;
  }

  return (
    <div style={{ fontFamily: `'${s.body.fontFamily}', serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: s.body.color, background: s.backgroundColor }}>
      <div style={{ padding: `${s.pageMargin * 0.75}px ${s.pageMargin}px`, background: s.headerBgColor === '#ffffff' ? '#1E293B' : s.headerBgColor }}>
        {personalInfo.fullName && (
          <h1 className="tracking-wide" style={{ fontFamily: `'${s.name.fontFamily}', serif`, fontSize: s.name.fontSize, fontWeight: s.name.fontWeight as any, color: '#fff' }}>{personalInfo.fullName}</h1>
        )}
        <div className="flex gap-4 mt-2" style={{ fontSize: s.contact.fontSize, color: '#94A3B8' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div style={{ padding: s.pageMargin }}>
        {vis.summary && summary && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 className="uppercase tracking-widest pb-1 border-b-2" style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, borderColor: s.accentColor, marginBottom: 8 }}>Professional Summary</h2>
            <p style={{ color: s.body.color }}>{summary}</p>
          </div>
        )}

        {vis.experience && experience.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 className="uppercase tracking-widest pb-1 border-b-2" style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, borderColor: s.accentColor, marginBottom: 12 }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <strong style={{ color: s.name.color }}>{exp.jobTitle}</strong>
                  <span style={{ fontSize: s.contact.fontSize, color: '#999' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p className="italic" style={{ color: s.contact.color }}>{exp.company}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1 ml-4 list-disc" style={{ color: s.body.color }}>
                    {exp.bullets.filter(b => b).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {vis.education && education.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 className="uppercase tracking-widest pb-1 border-b-2" style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, borderColor: s.accentColor, marginBottom: 12 }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <strong style={{ color: s.name.color }}>{edu.degree}</strong>
                {edu.institution && <span style={{ color: s.contact.color }}> — {edu.institution}</span>}
                {edu.graduationYear && <span style={{ color: '#999' }}> ({edu.graduationYear})</span>}
              </div>
            ))}
          </div>
        )}

        {vis.skills && skills.length > 0 && (
          <div>
            <h2 className="uppercase tracking-widest pb-1 border-b-2" style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.accentColor, borderColor: s.accentColor, marginBottom: 8 }}>Skills</h2>
            <p style={{ color: s.body.color }}>{skills.map(sk => sk.name).filter(Boolean).join(' · ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const BoldTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  const sidebarBg = s.accentColor || '#7C3AED';

  return (
    <div className="flex min-h-full" style={{ fontFamily: `'${s.body.fontFamily}', sans-serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight }}>
      {/* Sidebar */}
      <div className="w-[35%]" style={{ padding: s.pageMargin * 0.75, background: sidebarBg, color: '#fff' }}>
        {personalInfo.fullName && (
          <h1 className="mb-4" style={{ fontFamily: `'${s.name.fontFamily}', sans-serif`, fontSize: s.name.fontSize * 0.85, fontWeight: s.name.fontWeight as any }}>{personalInfo.fullName}</h1>
        )}
        <div className="space-y-1 mb-6" style={{ fontSize: s.contact.fontSize, color: 'rgba(255,255,255,0.8)' }}>
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          {personalInfo.github && <p>{personalInfo.github}</p>}
        </div>

        {vis.skills && skills.length > 0 && (
          <div>
            <h2 className="uppercase tracking-widest mb-2" style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: 'rgba(255,255,255,0.6)' }}>Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span style={{ fontSize: s.contact.fontSize }}>{skill.name}</span>
                  <div className="w-full h-1 rounded-full mt-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <div className="h-1 rounded-full" style={{ background: '#fff', width: skill.level === 'expert' ? '100%' : skill.level === 'intermediate' ? '66%' : '33%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vis.education && education.length > 0 && (
          <div className="mt-6">
            <h2 className="uppercase tracking-widest mb-2" style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: 'rgba(255,255,255,0.6)' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2" style={{ fontSize: s.contact.fontSize }}>
                <p className="font-semibold">{edu.degree}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>{edu.institution}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>{edu.graduationYear}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1" style={{ padding: s.pageMargin * 0.75, color: s.body.color, background: s.backgroundColor }}>
        {vis.summary && summary && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 className="uppercase tracking-widest" style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: sidebarBg, marginBottom: 8 }}>About Me</h2>
            <p>{summary}</p>
          </div>
        )}

        {vis.experience && experience.length > 0 && (
          <div>
            <h2 className="uppercase tracking-widest" style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: sidebarBg, marginBottom: 12 }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-3" style={{ borderLeft: `2px solid ${sidebarBg}` }}>
                <div className="flex justify-between">
                  <strong>{exp.jobTitle}</strong>
                  <span style={{ fontSize: s.contact.fontSize, color: '#999' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p style={{ color: sidebarBg }}>{exp.company}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1 ml-3 list-disc">
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
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p className="text-sm">Start filling in your details to see the preview</p>
      </div>
    );
  }

  const terminalBg = s.backgroundColor === '#ffffff' ? '#0F172A' : s.backgroundColor;
  const terminalAccent = s.accentColor || '#10B981';

  return (
    <div style={{ padding: s.pageMargin, fontFamily: `'${s.body.fontFamily}', 'JetBrains Mono', monospace`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: '#E2E8F0', background: terminalBg }}>
      {personalInfo.fullName && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h1 style={{ fontFamily: `'${s.name.fontFamily}', monospace`, fontSize: s.name.fontSize, fontWeight: s.name.fontWeight as any, color: terminalAccent }}>
            {'> '}{personalInfo.fullName}
          </h1>
          <div className="flex gap-3 mt-2" style={{ fontSize: s.contact.fontSize, color: '#64748B' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      )}

      {vis.summary && summary && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: terminalAccent, marginBottom: 8 }}>## Summary</h2>
          <p style={{ color: '#94A3B8' }}>{summary}</p>
        </div>
      )}

      {vis.experience && experience.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: terminalAccent, marginBottom: 12 }}>## Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3 pl-3" style={{ borderLeft: `2px solid ${terminalAccent}` }}>
              <div className="flex justify-between">
                <span style={{ color: '#E2E8F0' }}>{exp.jobTitle} <span style={{ color: '#64748B' }}>@ {exp.company}</span></span>
                <span style={{ fontSize: s.contact.fontSize, color: '#475569' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
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

      {vis.education && education.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: terminalAccent, marginBottom: 8 }}>## Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-1">
              <span style={{ color: '#E2E8F0' }}>{edu.degree}</span>
              <span style={{ color: '#64748B' }}> — {edu.institution} ({edu.graduationYear})</span>
            </div>
          ))}
        </div>
      )}

      {vis.skills && skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: terminalAccent, marginBottom: 8 }}>## Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill.id} className="px-2 py-0.5 rounded" style={{ fontSize: s.contact.fontSize, background: terminalBg === '#0F172A' ? '#1E293B' : 'rgba(0,0,0,0.2)', color: terminalAccent, border: `1px solid ${terminalAccent}` }}>
                {skill.name || 'skill'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
