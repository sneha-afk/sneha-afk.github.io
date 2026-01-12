import { type SkillsSection as SkillsSectionType } from "@pages/section_types";

export const SkillsSection = ({ title, groups }: SkillsSectionType) => {
  return (
    <section className="resume-section">
      {title && <h2>{title}</h2>}

      <div className="skills-container">
        {groups.map((group) => (
          <div key={group.label} className="skill-category">
            <h3 className="skill-category-title">{group.label}:</h3>
            <div className="skills-list">
              {group.items.map((item) => (
                <span key={item} className="skill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
