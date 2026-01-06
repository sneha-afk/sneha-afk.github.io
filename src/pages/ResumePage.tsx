import { PageLayout, ProjectsSection } from "@components";
import "@styles/_resume.scss";

interface ContactLink {
  label: string;
  url: string;
}

interface ResumeItemBase {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string[];
}

interface EducationItem extends ResumeItemBase {
  degree: string;
  gpa?: string;
  achievements?: string[];
  coursework?: string[];
}

interface ExperienceItem extends ResumeItemBase {
  company: string;
  responsibilities?: string[];
}

const CONTACT_INFO = {
  name: "Sneha De",
  location: "Campbell, CA",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sneha-de/" },
    { label: "GitHub", url: "https://github.com/sneha-afk" },
  ] as ContactLink[],
};

const SKILLS = {
  "Programming Languages": [
    "C",
    "C++",
    "Python",
    "Java",
    "Go",
    "SQL",
    "TypeScript",
    "Ruby",
    "HTML",
    "CSS",
  ],
  "Tools & Platforms": [
    "Git",
    "Linux (Ubuntu, WSL)",
    "SQLite",
    "GNU Make",
    "Markdown",
    "LaTeX",
    "Postman",
    "Splunk",
  ],
  "Frameworks & Libraries": ["Keras", "PyTorch", "NumPy", "React", "gpiozero"],
} as const;

const EDUCATION: EducationItem[] = [
  {
    id: "ucsd-ms",
    title: "University of California, San Diego",
    date: "Sep. 2024 - Dec. 2025",
    location: "La Jolla, CA",
    degree: "Master of Science in Computer Science",
    gpa: "3.91",
    coursework: [
      "Data Structures and Algorithms",
      "Artificial Intelligence and Machine Learning",
      "Operating Systems",
      "Embedded Systems",
      "Networked Services",
      "Parallel Computation",
      "Agentic LLM Systems",
    ],
  },
  {
    id: "ucsc-bs",
    title: "University of California, Santa Cruz",
    date: "Sep. 2022 - Jun. 2024",
    location: "Santa Cruz, CA",
    degree: "Bachelor of Science in Computer Science",
    gpa: "3.95",
    achievements: [
      "Highest honors in the major",
      "University Honors (Magna cum laude)",
      "Dean's Honors List",
    ],
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    id: "stripe-fulltime",
    title: "Software Engineer",
    company: "Stripe",
    date: "Jan. 2026 - Present",
    location: "South San Francisco, CA",
  },
  {
    id: "stripe-intern",
    title: "Software Engineering Intern",
    company: "Stripe",
    date: "Jun. 2025 - Sep. 2025",
    location: "South San Francisco, CA",
  },
  {
    id: "ucsc-tutor",
    title: "Group Tutor",
    company:
      "Baskin School of Engineering, University of California, Santa Cruz",
    date: "Sep. 2023 - Jun. 2024",
    location: "Santa Cruz, CA",
    responsibilities: [
      "Facilitated weekly sessions on C programming and introductory system design, including data structures, memory management, and effective debugging practices",
      "Mentored 400+ undergraduates on using UNIX development tools, including compilers (clang/gcc), build automation with Makefiles, memory debugging with Valgrind, and Bash scripting",
    ],
  },
  {
    id: "codeday-intern",
    title: "Software Engineering Intern",
    company: "CodeDay",
    date: "Jun. 2023 - Aug. 2023",
    location: "Remote",
    responsibilities: [
      "Contributed to Microsoft's Semantic Kernel, an open-source multi-language SDK for AI orchestration",
      'Collaborated on enabling logit bias adjustments to prioritize tokens for fine-tuned LLM outputs: <a href="https://github.com/microsoft/semantic-kernel/pull/1880" target="_blank" rel="noopener noreferrer">(PR #1880)</a>',
      'Integrated Redis vector embedding storage with configurable ANN indexing (HNSW/FLAT) and similarity metrics to enable low-latency, RAG-driven retrieval from user-provided datasets: <a href="https://github.com/microsoft/semantic-kernel/pull/2132" target="_blank" rel="noopener noreferrer">(PR #2132)</a>',
    ],
  },
];

// Components
const ContactHeader = () => (
  <div className="resume-header">
    <h1>{CONTACT_INFO.name}</h1>
    <p>
      {CONTACT_INFO.location} |{" "}
      {CONTACT_INFO.links.map((link, index) => (
        <span key={link.label}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
          {index < CONTACT_INFO.links.length - 1 && " | "}
        </span>
      ))}
    </p>
  </div>
);

const SkillCategory = ({
  category,
  skills,
}: {
  category: string;
  skills: readonly string[];
}) => (
  <div className="skill-category">
    <h3 className="skill-category-title">{category}:</h3>
    <div className="skills-list">
      {skills.map((skill) => (
        <span key={skill} className="skill">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const EducationCard = ({ item }: { item: EducationItem }) => (
  <div className="resume-item">
    <div className="resume-item-header">
      <h3 className="position">{item.title}</h3>
      <p className="date">{item.date}</p>
      <p className="degree">
        {item.degree}
        {item.gpa && `; GPA: ${item.gpa}`}
      </p>
      <p className="location">{item.location}</p>
    </div>
    {(item.coursework || item.achievements) && (
      <div className="resume-item-details">
        <ul>
          {item.coursework && (
            <li>
              <strong>Relevant coursework: </strong>
              {item.coursework.join(", ")}
            </li>
          )}
          {item.achievements && (
            <li>
              <strong>Achievements: </strong>
              {item.achievements.join(", ")}
            </li>
          )}
        </ul>
      </div>
    )}
  </div>
);

const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
  <div className="resume-item">
    <div className="resume-item-header">
      <h3 className="position">{item.title}</h3>
      <p className="date">{item.date}</p>
      <p className="employer">{item.company}</p>
      <p className="location">{item.location}</p>
    </div>
    {item.responsibilities && (
      <div className="resume-item-details">
        <ul>
          {item.responsibilities.map((responsibility, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: responsibility }}
            />
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ResumePage = () => {
  return (
    <PageLayout title="Resume" showBackLink={true} showPageTitle={false}>
      <div className="resume-disclaimer">
        <p>
          Not a fan of having my go-to email and number out there for the
          crawlers, contact me on LinkedIn to get in touch or get a PDF of this
          resume, thanks!
        </p>
        <hr />
      </div>

      <div className="resume">
        <ContactHeader />

        <section className="resume-section">
          <h2>Education</h2>
          {EDUCATION.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skills-container">
            {Object.entries(SKILLS).map(([category, skills]) => (
              <SkillCategory
                key={category}
                category={category}
                skills={skills}
              />
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {EXPERIENCE.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </section>

        <ProjectsSection />
      </div>
    </PageLayout>
  );
};

export default ResumePage;
