import { ResumeData, ResumeStyles, defaultStyles } from '@/store/resumeStore';
import { sampleResumeData } from '@/lib/sampleResumeData';

interface TemplateProps {
  data: ResumeData;
}

const getStyles = (data: ResumeData): ResumeStyles => data.styles || defaultStyles;

export const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) return <CreativeTemplate data={sampleResumeData} />;

  const accent = s.accentColor || '#E11D48';
  const accentLight = accent + '18';

  return (
    <div style={{ fontFamily: `'${s.body.fontFamily}', sans-serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: s.body.color, background: s.backgroundColor }}>
      {/* Hero header */}
      <div style={{ padding: `${Math.round(s.pageMargin * 1.2)}px ${s.pageMargin}px`, background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: '30%', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        {personalInfo.fullName && (
          <h1 style={{ fontFamily: `'${s.name.fontFamily}', sans-serif`, fontSize: `${parseFloat(String(s.name.fontSize)) * 1.2}px`, fontWeight: s.name.fontWeight as any, letterSpacing: s.name.letterSpacing, position: 'relative', zIndex: 1 }}>
            {personalInfo.fullName}
          </h1>
        )}
        <div className="flex flex-wrap gap-3 mt-3" style={{ fontSize: s.contact.fontSize, color: 'rgba(255,255,255,0.85)', position: 'relative', zIndex: 1 }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>✆ {personalInfo.phone}</span>}
          {personalInfo.location && <span>⌖ {personalInfo.location}</span>}
          {personalInfo.portfolio && <span>⌘ {personalInfo.portfolio}</span>}
        </div>
      </div>

      <div style={{ padding: s.pageMargin }}>
        {vis.summary && summary && (
          <div style={{ marginBottom: s.sectionSpacing, padding: 16, background: accentLight, borderRadius: 8, borderLeft: `4px solid ${accent}` }}>
            <p style={{ color: s.body.color, fontStyle: 'italic' }}>{summary}</p>
          </div>
        )}

        {vis.experience && experience.length > 0 && (
          <div style={{ marginBottom: s.sectionSpacing }}>
            <h2 style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 28, height: 3, background: accent, display: 'inline-block' }} />
              Experience
            </h2>
            {experience.map((exp, idx) => (
              <div key={exp.id} className="mb-4 flex gap-4">
                <div className="flex flex-col items-center" style={{ minWidth: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent, marginTop: 4 }} />
                  {idx < experience.length - 1 && <div style={{ width: 2, flex: 1, background: accent + '30' }} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <strong style={{ color: s.name.color }}>{exp.jobTitle}</strong>
                    <span style={{ fontSize: s.contact.fontSize, color: '#999' }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
                  </div>
                  {exp.company && <p style={{ color: accent, fontWeight: 600, fontSize: s.contact.fontSize }}>{exp.company}</p>}
                  {exp.bullets.filter(b => b).length > 0 && (
                    <ul className="mt-1 ml-3" style={{ color: s.body.color }}>
                      {exp.bullets.filter(b => b).map((b, i) => <li key={i} className="mb-0.5">→ {b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {vis.education && education.length > 0 && (
            <div className="flex-1" style={{ marginBottom: s.sectionSpacing }}>
              <h2 style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 3, background: accent, display: 'inline-block' }} />
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <strong style={{ color: s.name.color }}>{edu.degree}</strong>
                  <p style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>{edu.institution} · {edu.graduationYear}</p>
                </div>
              ))}
            </div>
          )}

          {vis.skills && skills.length > 0 && (
            <div className="flex-1">
              <h2 style={{ fontFamily: `'${s.headings.fontFamily}', sans-serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: accent, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 28, height: 3, background: accent, display: 'inline-block' }} />
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-3 py-1 rounded-full font-medium" style={{ fontSize: s.contact.fontSize, background: accentLight, color: accent, border: `1px solid ${accent}40` }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
