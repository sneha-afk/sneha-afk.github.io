import "@styles/_resume.scss";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  technologies: string[];
  links?: ProjectLink[];
  achievements: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "smarthomeaccess",
    title: "SmartHomeAccess",
    date: "Jan. 2025 - Mar. 2025",
    location: "University of California, San Diego",
    technologies: ["Python", "Flask", "SQLite", "Raspberry Pi"],
    achievements: [
      "Co-designed an embedded RFID-based home access system, achieving 600 ms average end-to-end latency and 90%+ detection accuracy using hardware-level interrupts",
      "Optimized real-time power efficiency to below 1 amperes using interrupt-driven multi-threading",
      "Ensured high-concurrency data integrity by utilizing SQLite’s Write-Ahead-Logging schematics for multi-client access",
    ],
  },
  {
    id: "astroauth",
    title: "AstroAuth",
    date: "Dec. 2024",
    technologies: ["Go", "SQLite"],
    links: [{ label: "GitHub", url: "https://github.com/sneha-afk/astroauth" }],
    achievements: [
      "Developed a secure prototype authentication API supporting RSA, ES256, or ES512 JWT hashing schemes",
      "Implemented secure credential management and database operations using trusted Go libraries, following security best practices for production-ready systems",
    ],
  },
  {
    id: "keplerkv",
    title: "KeplerKV",
    date: "Jul. 2024 - Dec. 2024",
    technologies: ["C++", "CMake", "Bash"],
    links: [{ label: "GitHub", url: "https://github.com/sneha-afk/KeplerKV" }],
    achievements: [
      "Built a lightweight NoSQL key-value store featuring a custom, extensible Domain Specific Language (DSL) for interactive CLI usage and automated script execution",
      "Implemented ACID-compliant, atomic transactions with efficient serialization and data persistence through WAL",
    ],
  },
  {
    id: "slugquest",
    title: "SlugQuest",
    date: "Jan. 2024 - Mar. 2024",
    location: "University of California, Santa Cruz",
    technologies: ["Go", "SvelteJS", "SQLite"],
    links: [{ label: "GitHub", url: "https://github.com/SlugQuest" }],
    achievements: [
      "Built a gamified productivity app with collaborative features and a reward system to boost user engagement",
      "Integrated Auth0 API by Okta for secure authentication via OAuth for session-handling with safe OIDC tokens",
      "Achieved over 95% code coverage through comprehensive unit testing with Go's native test framework",
    ],
  },
];

interface ProjectCardProps {
  project: ProjectItem;
  showTitle?: boolean;
}

const ProjectCard = ({ project, showTitle = true }: ProjectCardProps) => (
  <div className="resume-item project-item">
    <div className="resume-item-header">
      {showTitle && <h3 className="position">{project.title}</h3>}
      <p className="date">{project.date}</p>
      {project.location && <p className="location">{project.location}</p>}
      <p className="tech-stack">{project.technologies.join(", ")}</p>
    </div>

    {project.links && (
      <div className="project-links">
        {project.links.map((link) => (
          <p key={link.label}>
            <strong>Project Link: </strong>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </p>
        ))}
      </div>
    )}

    <div className="resume-item-details">
      <ul>
        {project.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  </div>
);

interface ProjectsSectionProps {
  title?: string;
  projects?: ProjectItem[];
  showProjectTitles?: boolean;
  className?: string;
}

const ProjectsSection = ({
  title = "Projects",
  projects = PROJECTS,
  showProjectTitles = true,
  className = "",
}: ProjectsSectionProps) => {
  return (
    <section className={`resume-section projects-section ${className}`}>
      {title && <h2>{title}</h2>}
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showTitle={showProjectTitles}
          />
        ))}
      </div>
    </section>
  );
};

// Export both the section and individual project data for flexibility
export { ProjectsSection as default, PROJECTS, type ProjectItem };
