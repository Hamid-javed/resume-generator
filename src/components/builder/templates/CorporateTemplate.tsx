import { ResumeData, ResumeStyles, defaultStyles } from '@/store/resumeStore';
import { Mail, Phone, MapPin } from 'lucide-react';
import { sampleResumeData } from '@/lib/sampleResumeData';

interface TemplateProps {
  data: ResumeData;
}

const getStyles = (data: ResumeData): ResumeStyles => data.styles || defaultStyles;

export const CorporateTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) return <CorporateTemplate data={sampleResumeData} />;

  const accent = s.accentColor || '#0F4C81';

  return (
    <div style={{ fontFamily: `'${s.body.fontFamily}', 'Georgia', serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: s.body.color, background: s.backgroundColor }}>
      {/* Top bar */}
      <div style={{ height: 6, background: accent }} />

      <div style={{ padding: s.pageMargin }}>
        {/* Header */}
        {personalInfo.fullName && (
          <div style={{ marginBottom: s.sectionSpacing, borderBottom: `2px solid ${accent}`, paddingBottom: 16 }}>
            <h1 style={{ fontFamily: `'${s.name.fontFamily}', serif`, fontSize: s.name.fontSize, fontWeight: s.name.fontWeight as any, color: accent, letterSpacing: s.name.letterSpacing, lineHeight: 1.1 }}>
              {personalInfo.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 mt-3" style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" style={{ color: accent }} />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" style={{ color: accent }} />{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: accent }} />{personalInfo.location}</span>}
            </div>
          </div>
        )}

        {vis.summary && summary && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: `1px solid #ddd`, paddingBottom: 4, marginBottom: 10 }}>Executive Summary</h2>
            <p style={{ color: s.body.color, fontStyle: 'italic' }}>{summary}</p>
          </div>
        )}

        {vis.experience && experience.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: `1px solid #ddd`, paddingBottom: 4, marginBottom: 12 }}>Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ color: s.name.color, fontSize: '1.05em' }}>{exp.jobTitle}</h3>
                  <span style={{ fontSize: s.contact.fontSize, color: '#888', fontStyle: 'italic' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p style={{ color: accent, fontWeight: 600, fontSize: s.contact.fontSize }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1.5 ml-4" style={{ listStyleType: 'square', color: s.body.color }}>
                    {exp.bullets.filter(b => b).map((b, i) => <li key={i} className="mb-0.5">{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {vis.education && education.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: `1px solid #ddd`, paddingBottom: 4, marginBottom: 12 }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <span className="font-bold" style={{ color: s.name.color }}>{edu.degree}</span>
                {edu.institution && <span style={{ color: s.contact.color }}> — {edu.institution}</span>}
                {edu.graduationYear && <span style={{ color: '#888', fontStyle: 'italic' }}> ({edu.graduationYear})</span>}
                {edu.gpa && <span style={{ fontSize: s.contact.fontSize, color: '#888' }}> | GPA: {edu.gpa}</span>}
              </div>
            ))}
          </div>
        )}

        {vis.skills && skills.length > 0 && (
          <div>
            <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: `1px solid #ddd`, paddingBottom: 4, marginBottom: 8 }}>Core Competencies</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1" style={{ fontSize: s.body.fontSize }}>
              {skills.map((skill) => (
                <span key={skill.id} style={{ color: s.body.color }}>■ {skill.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
