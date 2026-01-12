import React from "react";

export type SectionConfig =
  | PlainSection
  | ContactSection
  | TimelineSection
  | SkillsSection
  | ProjectsSection
  | MarkdownSection;

export interface PlainSection {
  type: "plain";
  title?: string;
  content?: string;
  emoji?: string;
  Component?: React.ReactNode;
}

export interface ContactSection {
  type: "contact";
  name: string;
  location?: string;
  links: {
    label: string;
    url: string;
  }[];
}

export interface TimelineSection {
  type: "timeline";
  title: string;
  variant?: "education" | "experience" | "default";
  items: TimelineItem[];
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  location?: string;
  bullets?: string[];
  meta?: string[];
}

export interface SkillsSection {
  type: "skills";
  title?: string;
  groups: {
    label: string;
    items: string[];
  }[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  technologies?: string[];
  links?: ProjectLink[];
  achievements?: string[];
}

export interface ProjectsSection {
  type: "projects";
  title?: string;
  limit?: number;
  items?: ProjectItem[];
}

export interface MarkdownSection {
  type: "markdown";
  title?: string;
  content?: string;
  emoji?: string;
  Component?: React.ReactNode;
}
