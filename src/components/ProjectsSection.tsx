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
      "Co-designed an RFID-based home access system with embedded hardware, achieving 90%+ detection reliability with 0.592s average detection time and 20ms authentication latency",
      "Optimized energy efficiency through interrupt-driven multithreading, significantly reducing power consumption to below 1A while maintaining real-time performance",
      "Utilized SQLite's Write-Ahead-Logging to ensure data consistency with concurrent multi-client operations",
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
      "Built a lightweight NoSQL key-value store supporting typed key-value pairs and basic transactions",
      "Designed a custom, extensible query language for efficient data management and manipulation, supporting both interactive CLI and automated script execution for production workflows",
      "Implemented ACID-compliant transactions with efficient serialization, ensuring data persistence and atomic operations under concurrent access",
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
      "Integrated Auth0 API by Okta for secure authentication, ensuring seamless user experience and data protection",
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
