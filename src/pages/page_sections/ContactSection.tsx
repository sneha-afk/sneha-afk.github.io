import { type ContactSection as ContactSectionType } from "@pages/section_types";

export const ContactSection = ({ name, location, links }: ContactSectionType) => {
  return (
    <div className="resume-header">
      <h1>{name}</h1>
      <p>
        {location}
        {" | "}
        {links.map((link, index) => (
          <span key={link.label}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {index < links.length - 1 && " | "}
          </span>
        ))}
      </p>
    </div>
  );
};
