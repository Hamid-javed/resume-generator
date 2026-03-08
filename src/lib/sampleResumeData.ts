import { ResumeData, defaultStyles } from '@/store/resumeStore';

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarachen',
    github: 'github.com/sarachen',
    portfolio: 'sarachen.dev',
    photoUrl: '',
  },
  summary:
    'Senior software engineer with 6+ years of experience building scalable web applications. Passionate about clean code, user-centric design, and leading cross-functional teams to deliver impactful products.',
  experience: [
    {
      id: 'sample-exp-1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: '',
      current: true,
      bullets: [
        'Led a team of 5 engineers to rebuild the core platform, reducing load time by 40%.',
        'Designed and implemented microservices architecture serving 2M+ daily users.',
        'Mentored junior developers through code reviews and pair programming sessions.',
      ],
    },
    {
      id: 'sample-exp-2',
      jobTitle: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      current: false,
      bullets: [
        'Built real-time data pipeline processing 500K events per minute.',
        'Developed customer-facing dashboard that increased user engagement by 25%.',
      ],
    },
  ],
  education: [
    {
      id: 'sample-edu-1',
      degree: 'B.S. Computer Science',
      institution: 'University of California, Berkeley',
      gpa: '3.8',
      graduationYear: '2018',
      honors: 'Magna Cum Laude',
    },
  ],
  skills: [
    { id: 'sk1', name: 'React', level: 'expert', category: 'technical' },
    { id: 'sk2', name: 'TypeScript', level: 'expert', category: 'technical' },
    { id: 'sk3', name: 'Node.js', level: 'expert', category: 'technical' },
    { id: 'sk4', name: 'Python', level: 'intermediate', category: 'technical' },
    { id: 'sk5', name: 'AWS', level: 'intermediate', category: 'technical' },
    { id: 'sk6', name: 'Leadership', level: 'expert', category: 'soft' },
  ],
  styles: defaultStyles,
};
