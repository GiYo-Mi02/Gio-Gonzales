import type { ReactNode } from 'react';

export interface Project {
  id: string;
  num: string;
  title: string;
  type: string;
  tech: string[];
  year: string;
  link: string;
  image: string;
}

export interface BuildStep {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: ReactNode;
  name: string;
  description: string;
}

export interface CaseStudy extends Project {
  github: string;
  role: string;
  timeline: string;
  problem: string;
  process: BuildStep[];
  features: Feature[];
  learned: string;
}

export interface Achievement {
  badge: string;
  org: string;
  competition: string;
  result: string;
  desc: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface AccordionItem {
  category: string;
  skills: string[];
  icon: ReactNode;
  summary: string;
}
