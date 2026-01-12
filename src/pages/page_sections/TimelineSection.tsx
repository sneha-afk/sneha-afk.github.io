import { type TimelineSection as TimelineSectionType, type TimelineItem } from "@pages/section_types";
import ReactMarkdown from "react-markdown";

export const TimelineSection = ({ title, items }: TimelineSectionType) => {
  return (
    <section className="resume-section">
      <h2>{title}</h2>

      {items.map((item) => (
        <TimelineItemView key={item.id} item={item} />
      ))}
    </section>
  );
};

const TimelineItemView = ({ item }: { item: TimelineItem }) => {
  return (
    <div className="resume-item">
      <div className="resume-item-header">
        <h3 className="position">{item.title}</h3>
        <p className="date">{item.date}</p>

        {item.subtitle && <p className="subtitle">{item.subtitle}</p>}

        {item.location && <p className="location">{item.location}</p>}
      </div>

      {item.bullets && (
        <div className="resume-item-details">
          <ul>
            {item.bullets.map((bullet, index) => (
              <li key={index}>
                <ReactMarkdown>{bullet}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimelineSection;
