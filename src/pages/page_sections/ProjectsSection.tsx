import { type ProjectsSection as ProjectsSectionType, type ProjectItem } from "@pages/section_types";

interface ProjectCardProps {
  project: ProjectItem;
  showTitle?: boolean;
}

const ProjectCard = ({ project, showTitle = true }: ProjectCardProps) => {
  return (
    <div className="resume-item project-item">
      <div className="resume-item-header">
        {showTitle && <h3 className="position">{project.title}</h3>}
        <p className="date">{project.date}</p>
        {project.location && <p className="location">{project.location}</p>}
        {project.technologies && <p className="tech-stack">{project.technologies.join(", ")}</p>}
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

      {project.achievements && (
        <div className="resume-item-details">
          <ul>
            {project.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = ({ title, items = [] }: ProjectsSectionType & { items?: ProjectItem[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="resume-section projects-section">
      {title && <h2>{title}</h2>}

      <div className="projects-container">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} showTitle={true} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
