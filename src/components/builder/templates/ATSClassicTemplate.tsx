import { ResumeData, ResumeStyles, defaultStyles } from '@/store/resumeStore';
import { sampleResumeData } from '@/lib/sampleResumeData';

interface TemplateProps {
  data: ResumeData;
}

const getStyles = (data: ResumeData): ResumeStyles => data.styles || defaultStyles;

export const ATSClassicTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const s = getStyles(data);
  const vis = s.sectionVisibility;
  const hasContent = personalInfo.fullName || summary || experience.length || education.length || skills.length;

  if (!hasContent) return <ATSClassicTemplate data={sampleResumeData} />;

  return (
    <div style={{ padding: s.pageMargin, fontFamily: `'${s.body.fontFamily}', 'Times New Roman', serif`, fontSize: s.body.fontSize, lineHeight: s.body.lineHeight, color: s.body.color, background: s.backgroundColor }}>
      {/* Header - simple centered */}
      {personalInfo.fullName && (
        <div className="text-center" style={{ marginBottom: s.sectionSpacing }}>
          <h1 style={{ fontFamily: `'${s.name.fontFamily}', serif`, fontSize: s.name.fontSize, fontWeight: s.name.fontWeight as any, color: s.name.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {personalInfo.fullName}
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-2 mt-2" style={{ fontSize: s.contact.fontSize, color: s.contact.color }}>
            {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).map((info, i, arr) => (
              <span key={i}>{info}{i < arr.length - 1 ? ' | ' : ''}</span>
            ))}
          </div>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '2px solid #000', marginBottom: s.sectionSpacing }} />

      {vis.summary && summary && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.name.color, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 2, marginBottom: 8 }}>Professional Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {vis.experience && experience.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.name.color, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 2, marginBottom: 12 }}>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <strong>{exp.jobTitle}</strong>
                <span style={{ fontSize: s.contact.fontSize }}>{exp.startDate} – {exp.endDate || 'Present'}</span>
              </div>
              {exp.company && <p style={{ fontStyle: 'italic' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>}
              {exp.bullets.filter(b => b).length > 0 && (
                <ul className="mt-1 ml-5 list-disc">
                  {exp.bullets.filter(b => b).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {vis.education && education.length > 0 && (
        <div style={{ marginBottom: s.sectionSpacing }}>
          <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.name.color, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 2, marginBottom: 12 }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <strong>{edu.degree}</strong>
                {edu.institution && <span> — {edu.institution}</span>}
                {edu.gpa && <span style={{ fontSize: s.contact.fontSize }}> (GPA: {edu.gpa})</span>}
              </div>
              {edu.graduationYear && <span style={{ fontSize: s.contact.fontSize }}>{edu.graduationYear}</span>}
            </div>
          ))}
        </div>
      )}

      {vis.skills && skills.length > 0 && (
        <div>
          <h2 style={{ fontFamily: `'${s.headings.fontFamily}', serif`, fontSize: s.headings.fontSize, fontWeight: s.headings.fontWeight as any, color: s.name.color, textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: 2, marginBottom: 8 }}>Skills</h2>
          <p>{skills.map(sk => sk.name).filter(Boolean).join(', ')}</p>
        </div>
      )}
    </div>
  );
};
