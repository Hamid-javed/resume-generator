import { ResumeData, ResumeStyles, defaultStyles } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { sampleResumeData } from '@/lib/sampleResumeData';

interface TemplateProps {
  data: ResumeData;
}

const getStyles = (data: ResumeData): ResumeStyles => data.styles || defaultStyles;

export const TwoColumnTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) return <TwoColumnTemplate data={sampleResumeData} />;

  const accent = s.accentColor || '#2563EB';
  const sidebarBg = '#F8FAFC';

  return (
    <div className="flex min-h-full" style={{ fontFamily: `'${s.body.fontFamily}', sans-serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight }}>
      {/* Left column */}
      <div style={{ width: '38%', padding: s.pageMargin * 0.75, background: sidebarBg, borderRight: `3px solid ${accent}` }}>
        {personalInfo.fullName && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h1 style={{ fontFamily: `'${s.name.fontFamily}', sans-serif`, fontSize: `${parseFloat(String(s.name.fontSize)) * 0.85}px`, fontWeight: s.name.fontWeight as any, color: accent, lineHeight: 1.2 }}>
              {personalInfo.fullName}
            </h1>
          </div>
        )}

        {/* Contact */}
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>Contact</h2>
          <div className="space-y-2" style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>
            {personalInfo.email && <p className="flex items-center gap-2"><Mail className="w-3 h-3" style={{ color: accent }} />{personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-center gap-2"><Phone className="w-3 h-3" style={{ color: accent }} />{personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-center gap-2"><MapPin className="w-3 h-3" style={{ color: accent }} />{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin className="w-3 h-3" style={{ color: accent }} />{personalInfo.linkedin}</p>}
            {personalInfo.github && <p className="flex items-center gap-2"><Github className="w-3 h-3" style={{ color: accent }} />{personalInfo.github}</p>}
            {personalInfo.portfolio && <p className="flex items-center gap-2"><Globe className="w-3 h-3" style={{ color: accent }} />{personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* Skills */}
        {vis.skills && skills.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>Skills</h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between" style={{ fontSize: s.contact.fontSize }}>
                    <span style={{ color: s.body.color }}>{skill.name}</span>
                    <span style={{ color: '#999', fontSize: '0.75em', textTransform: 'capitalize' }}>{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mt-1" style={{ background: '#E2E8F0' }}>
                    <div className="h-1.5 rounded-full" style={{ background: accent, width: skill.level === 'expert' ? '100%' : skill.level === 'intermediate' ? '70%' : '40%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {vis.education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3" style={{ fontSize: s.contact.fontSize }}>
                <p className="font-bold" style={{ color: s.name.color }}>{edu.degree}</p>
                <p style={{ color: s.contact.color }}>{edu.institution}</p>
                <p style={{ color: '#999' }}>{edu.graduationYear}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right column */}
      <div className="flex-1" style={{ padding: s.pageMargin * 0.75, color: s.body.color, background: s.backgroundColor }}>
        {vis.summary && summary && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>Profile</h2>
            <p>{summary}</p>
          </div>
        )}

        {vis.experience && experience.length > 0 && (
          <div>
            <h2 style={{ fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline">
                  <strong style={{ color: s.name.color, fontSize: '1.05em' }}>{exp.jobTitle}</strong>
                  <span style={{ fontSize: s.contact.fontSize, color: '#999', whiteSpace: 'nowrap' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                </div>
                {exp.company && <p style={{ color: accent, fontWeight: 600, fontSize: s.contact.fontSize }}>{exp.company}</p>}
                {exp.bullets.filter(b => b).length > 0 && (
                  <ul className="mt-1.5 ml-4 list-disc" style={{ color: s.body.color }}>
                    {exp.bullets.filter(b => b).map((b, i) => <li key={i} className="mb-0.5">{b}</li>)}
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
