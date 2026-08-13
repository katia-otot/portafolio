export interface HowItWorksStep {
  label: string;
  detail?: string;
  tone?: 'light' | 'accent';
}

export interface ProjectHowItWorks {
  summary: string;
  footnote?: string;
  /** flow = pasos en secuencia | points = tarjetas sin diagrama */
  layout: 'flow' | 'points';
  steps: HowItWorksStep[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  howItWorks?: ProjectHowItWorks;
}
