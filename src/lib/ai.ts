import { supabase } from '@/integrations/supabase/client';
import type { ResumeData } from '@/store/resumeStore';

interface AIResponse<T> {
  result?: T;
  error?: string;
}

async function callAI<T>(type: string, data: any): Promise<T> {
  const { data: result, error } = await supabase.functions.invoke('resume-ai', {
    body: { type, data },
  });

  if (error) throw new Error(error.message || 'AI request failed');
  if (result?.error) throw new Error(result.error);
  return result.result as T;
}

export async function improveBullet(bullet: string, jobTitle: string, company: string): Promise<string> {
  const result = await callAI<{ bullet: string }>('improve_bullet', { bullet, jobTitle, company });
  return result.bullet;
}

export async function generateSummary(resumeData: ResumeData): Promise<string> {
  const result = await callAI<{ summary: string }>('generate_summary', {
    experience: resumeData.experience,
    skills: resumeData.skills,
    name: resumeData.personalInfo.fullName,
  });
  return result.summary;
}

export interface SuggestedSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  category: 'technical' | 'soft' | 'language';
}

export async function suggestSkills(resumeData: ResumeData): Promise<SuggestedSkill[]> {
  const result = await callAI<{ skills: SuggestedSkill[] }>('suggest_skills', {
    experience: resumeData.experience,
  });
  return result.skills;
}

export interface ATSAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
}

export async function analyzeATS(resumeData: ResumeData, jobDescription?: string): Promise<ATSAnalysis> {
  return callAI<ATSAnalysis>('ats_score', { ...resumeData, jobDescription });
}
