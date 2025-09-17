import React from "react";

/**
 * CustomAbbreviation Component
 *
 * Renders abbreviations with tooltip definitions.
 *
 * Usage in Markdown:
 * Use HTML syntax: <abbr title="HyperText Markup Language">HTML</abbr>
 * Or define a custom syntax if needed
 */

interface CustomAbbreviationProps {
  children: React.ReactNode;
  title?: string;
}

const CustomAbbreviation: React.FC<CustomAbbreviationProps> = ({
  children,
  title,
}) => {
  return (
    <abbr
      className="custom-abbr"
      title={title}
      style={{
        textDecoration: "underline dotted",
        cursor: "help",
      }}
    >
      {children}
    </abbr>
  );
};

export default CustomAbbreviation;
