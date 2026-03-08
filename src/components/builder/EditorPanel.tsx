import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, User, Briefcase, GraduationCap, Lightbulb, FileText, Sparkles, Loader2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { improveBullet, generateSummary, suggestSkills } from '@/lib/ai';
import ATSPanel from './ATSPanel';

const sectionNav = [
  { id: 'personal', icon: User, label: 'Personal' },
  { id: 'summary', icon: FileText, label: 'Summary' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'skills', icon: Lightbulb, label: 'Skills' },
  { id: 'ats', icon: BarChart3, label: 'ATS Score' },
];

const EditorPanel = () => {
  const store = useResumeStore();
  const { data, activeSection } = store;
  const [loadingBullet, setLoadingBullet] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);

  const handleImproveBullet = async (expId: string, bulletIndex: number, bullet: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (!bullet.trim()) { toast.error('Write something first'); return; }
    const key = `${expId}-${bulletIndex}`;
    setLoadingBullet(key);
    try {
      const improved = await improveBullet(bullet, exp?.jobTitle || '', exp?.company || '');
      store.updateBullet(expId, bulletIndex, improved);
      toast.success('Bullet point improved!');
    } catch (e: any) {
      toast.error(e.message || 'Failed to improve bullet');
    } finally {
      setLoadingBullet(null);
    }
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      const summary = await generateSummary(data);
      store.setSummary(summary);
      toast.success('Summary generated!');
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate summary');
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleSuggestSkills = async () => {
    setLoadingSkills(true);
    try {
      const skills = await suggestSkills(data);
      const generateId = () => Math.random().toString(36).substr(2, 9);
      skills.forEach(skill => {
        store.addSkill();
        const currentSkills = useResumeStore.getState().data.skills;
        const lastSkill = currentSkills[currentSkills.length - 1];
        store.updateSkill(lastSkill.id, { name: skill.name, level: skill.level, category: skill.category });
      });
      toast.success(`${skills.length} skills suggested!`);
    } catch (e: any) {
      toast.error(e.message || 'Failed to suggest skills');
    } finally {
      setLoadingSkills(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Section nav */}
      <div className="flex gap-1 p-3 border-b border-border overflow-x-auto">
        {sectionNav.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => store.setActiveSection(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeSection === id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeSection === 'personal' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground font-sans">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" value={data.personalInfo.fullName} onChange={(e) => store.setPersonalInfo({ fullName: e.target.value })} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="john@example.com" value={data.personalInfo.email} onChange={(e) => store.setPersonalInfo({ email: e.target.value })} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+1 234 567 890" value={data.personalInfo.phone} onChange={(e) => store.setPersonalInfo({ phone: e.target.value })} />
              </div>
              <div>
                <Label>Location</Label>
                <Input placeholder="San Francisco, CA" value={data.personalInfo.location} onChange={(e) => store.setPersonalInfo({ location: e.target.value })} />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input placeholder="linkedin.com/in/johndoe" value={data.personalInfo.linkedin} onChange={(e) => store.setPersonalInfo({ linkedin: e.target.value })} />
              </div>
              <div>
                <Label>GitHub</Label>
                <Input placeholder="github.com/johndoe" value={data.personalInfo.github} onChange={(e) => store.setPersonalInfo({ github: e.target.value })} />
              </div>
              <div>
                <Label>Portfolio</Label>
                <Input placeholder="johndoe.com" value={data.personalInfo.portfolio} onChange={(e) => store.setPersonalInfo({ portfolio: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'summary' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-sans">Professional Summary</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerateSummary}
                disabled={loadingSummary}
                className="text-primary border-primary/30 hover:bg-primary/5"
              >
                {loadingSummary ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
                AI Write
              </Button>
            </div>
            <Textarea
              placeholder="A brief summary of your professional background and career goals..."
              className="min-h-[150px]"
              value={data.summary}
              onChange={(e) => store.setSummary(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">{data.summary.length} characters</p>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-sans">Work Experience</h3>
              <Button size="sm" variant="outline" onClick={() => store.addExperience()}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            {data.experience.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">No experience added yet. Click "Add" to get started.</p>
            )}
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{exp.jobTitle || 'New Position'}</span>
                  <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => store.removeExperience(exp.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Job Title</Label>
                    <Input placeholder="Software Engineer" value={exp.jobTitle} onChange={(e) => store.updateExperience(exp.id, { jobTitle: e.target.value })} />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Google" value={exp.company} onChange={(e) => store.updateExperience(exp.id, { company: e.target.value })} />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input placeholder="Jan 2022" value={exp.startDate} onChange={(e) => store.updateExperience(exp.id, { startDate: e.target.value })} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input placeholder="Present" value={exp.endDate} onChange={(e) => store.updateExperience(exp.id, { endDate: e.target.value })} disabled={exp.current} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bullet Points</Label>
                  {exp.bullets.map((bullet, i) => {
                    const bulletKey = `${exp.id}-${i}`;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Describe your achievement..."
                            value={bullet}
                            onChange={(e) => store.updateBullet(exp.id, i, e.target.value)}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-9 w-9 shrink-0 text-primary hover:bg-primary/5"
                            onClick={() => handleImproveBullet(exp.id, i, bullet)}
                            disabled={loadingBullet === bulletKey}
                            title="Improve with AI"
                          >
                            {loadingBullet === bulletKey ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                          </Button>
                          <Button size="icon" variant="ghost" className="text-destructive h-9 w-9 shrink-0" onClick={() => store.removeBullet(exp.id, i)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  <Button size="sm" variant="ghost" onClick={() => store.addBullet(exp.id)}>
                    <Plus className="w-3 h-3 mr-1" /> Add Bullet
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-sans">Education</h3>
              <Button size="sm" variant="outline" onClick={() => store.addEducation()}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
            {data.education.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">No education added yet.</p>
            )}
            {data.education.map((edu) => (
              <div key={edu.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{edu.degree || 'New Entry'}</span>
                  <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => store.removeEducation(edu.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Degree</Label>
                    <Input placeholder="B.S. Computer Science" value={edu.degree} onChange={(e) => store.updateEducation(edu.id, { degree: e.target.value })} />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input placeholder="MIT" value={edu.institution} onChange={(e) => store.updateEducation(edu.id, { institution: e.target.value })} />
                  </div>
                  <div>
                    <Label>GPA</Label>
                    <Input placeholder="3.9" value={edu.gpa} onChange={(e) => store.updateEducation(edu.id, { gpa: e.target.value })} />
                  </div>
                  <div>
                    <Label>Graduation Year</Label>
                    <Input placeholder="2024" value={edu.graduationYear} onChange={(e) => store.updateEducation(edu.id, { graduationYear: e.target.value })} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground font-sans">Skills</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSuggestSkills}
                  disabled={loadingSkills}
                  className="text-primary border-primary/30 hover:bg-primary/5"
                >
                  {loadingSkills ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
                  AI Suggest
                </Button>
                <Button size="sm" variant="outline" onClick={() => store.addSkill()}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>
            {data.skills.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">No skills added yet. Try "AI Suggest" to get started.</p>
            )}
            <div className="space-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex gap-2 items-center">
                  <Input
                    placeholder="Skill name"
                    className="flex-1"
                    value={skill.name}
                    onChange={(e) => store.updateSkill(skill.id, { name: e.target.value })}
                  />
                  <select
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    value={skill.level}
                    onChange={(e) => store.updateSkill(skill.id, { level: e.target.value as any })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                  <Button size="icon" variant="ghost" className="text-destructive h-9 w-9 shrink-0" onClick={() => store.removeSkill(skill.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'ats' && <ATSPanel />}
      </div>
    </div>
  );
};

export default EditorPanel;
