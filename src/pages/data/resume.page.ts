import { type PageConfig } from "@pages/page_types";
import { PROJECTS } from "./projects.page";

export const resumePage: PageConfig = {
  title: "Resume",
  layout: {
    showPageTitle: false,
  },
  sections: [
    {
      type: "plain",
      content:
        "Not a fan of having my go-to email and number out there for the crawlers. Contact me on LinkedIn to get in touch or get a PDF of this resume, thanks!",
    },

    {
      type: "contact",
      name: "Sneha De",
      location: "Campbell, CA",
      links: [
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/sneha-de/",
        },
        {
          label: "GitHub",
          url: "https://github.com/sneha-afk",
        },
      ],
    },

    {
      type: "timeline",
      title: "Education",
      variant: "education",
      items: [
        {
          id: "ucsd-ms",
          title: "University of California, San Diego",
          subtitle: "M.S. Computer Science · GPA 3.91",
          date: "Sep 2024 - Dec 2025",
          location: "La Jolla, CA",
          bullets: [
            "**Relevant coursework**: Data Structures and Algorithms, Artificial Intelligence and Machine Learning, Operating Systems, Embedded Systems, Networked Services, Parallel Computation, Agentic LLM Systems",
          ],
        },
        {
          id: "ucsc-bs",
          title: "University of California, Santa Cruz",
          subtitle: "B.S. Computer Science · GPA 3.95",
          date: "Sep 2022 - Jun 2024",
          location: "Santa Cruz, CA",
          bullets: [
            "**Achievements**: Highest honors in the major, University Honors (Magna cum laude), Dean's Honors List",
          ],
        },
      ],
    },

    {
      type: "skills",
      title: "Skills",
      groups: [
        {
          label: "Programming Languages",
          items: ["C", "C++", "Python", "Java", "Go", "SQL", "TypeScript", "Ruby"],
        },
        {
          label: "Tools & Platforms",
          items: ["Git", "Linux (Ubuntu, WSL)", "SQLite", "GNU Make", "Markdown", "LaTeX", "Postman", "Splunk"],
        },
        {
          label: "Frameworks & Libraries",
          items: ["React", "PyTorch", "Keras", "NumPy"],
        },
      ],
    },

    {
      type: "timeline",
      title: "Experience",
      variant: "experience",
      items: [
        {
          id: "stripe-ft",
          title: "Software Engineer",
          subtitle: "Stripe",
          date: "Jan 2026 - Present",
          location: "South San Francisco, CA",
        },
        {
          id: "stripe-intern",
          title: "Software Engineering Intern",
          subtitle: "Stripe",
          date: "Jun 2025 - Sep 2025",
          location: "South San Francisco, CA",
        },
        {
          id: "ucsc-tutor",
          title: "Group Tutor",
          subtitle: "Baskin School of Engineering, University of California, Santa Cruz",
          date: "Sep 2023 - Jun 2024",
          location: "Santa Cruz, CA",
          bullets: [
            "Facilitated weekly sessions on C programming and introductory system design",
            "Mentored 400+ undergraduates on UNIX tools, Makefiles, and debugging",
          ],
        },
        {
          id: "codeday",
          title: "Software Engineering Intern",
          subtitle: "CodeDay",
          date: "Jun 2023 - Aug 2023",
          location: "Remote",
          bullets: [
            "Contributed to Microsoft's Semantic Kernel",
            "Implemented Redis vector embedding storage for RAG workflows",
          ],
        },
      ],
    },

    {
      type: "projects",
      title: "Projects",
      items: PROJECTS,
    },
  ],
};
