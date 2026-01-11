const ClassicTemplate = ({ data }) => {
  const { 
    personal, 
    summary, 
    education, 
    experience, 
    skills, 
    projects, 
    certifications, 
    languages, 
    references, 
    customSections 
  } = data;

  const renderField = (value, className = "") => {
    if (!value) return null;
    const isPlaceholder = typeof value === 'string' && value.startsWith("Set ");
    return (
      <span className={`${className} ${isPlaceholder ? "text-red-600 font-bold" : ""}`}>
        {value}
      </span>
    );
  };

  const renderHTML = (html, className = "") => {
    if (!html) return null;
    const isPlaceholder = typeof html === 'string' && html.startsWith("Set ");
    if (isPlaceholder) return renderField(html, className);

    return (
      <div 
        className={`html-content ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="text-black text-[14px] leading-relaxed">
      <style>{`
        .html-content {
          overflow-wrap: break-word;
        }
        .html-content p {
          margin-bottom: 0.125rem;
        }
        .html-content ul, .html-content ol {
          margin-bottom: 0.25rem;
          padding-left: 1.25rem;
        }
        .html-content ul {
          list-style-type: disc;
        }
        .html-content ol {
          list-style-type: decimal;
        }
        .html-content li {
          margin-bottom: 0.125rem;
        }
      `}</style>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{renderField(personal?.fullName)}</h1>
        <p className="text-sm">
          {renderField(personal?.email)} • {renderField(personal?.phone)} • {renderField(personal?.location)}
        </p>
        <div className="text-sm text-blue-600 flex justify-center gap-2">
          {personal?.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          {personal?.github && (
            <>
              {personal?.linkedin && " • "}
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </>
          )}
          {personal?.portfolio && (
            <>
              {(personal?.linkedin || personal?.github) && " • "}
              <a href={personal.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            </>
          )}
          {personal?.behance && (
            <>
              {(personal?.linkedin || personal?.github || personal?.portfolio) && " • "}
              <a href={personal.behance} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Behance
              </a>
            </>
          )}
           {personal?.dribble && (
            <>
              {(personal?.linkedin || personal?.github || personal?.portfolio || personal?.behance) && " • "}
              <a href={personal.dribble} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Dribble
              </a>
            </>
          )}
        </div>
      </div>

      {summary?.summary && (
        <>
          <h2 className="font-semibold border-b mb-2">Summary</h2>
          {renderHTML(summary.summary)}
        </>
      )}

      {education?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{renderField(e.institution)}</p>
                  <p>{renderField(e.degree)} {e.field && `in ${e.field}`}</p>
                </div>
                <p>{renderField(e.startDate)} – {renderField(e.endDate)}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {experience?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Experience</h2>
          {experience.map((ex, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between font-medium">
                <p>{renderField(ex.position)} — {renderField(ex.company)}</p>
                <p>{renderField(ex.startDate)} – {renderField(ex.endDate)}</p>
              </div>
              {renderHTML(ex.description, "text-[13px]")}
            </div>
          ))}
        </>
      )}

      {skills?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Skills</h2>
          <div className="space-y-1">
            {skills.map((s, i) => (
              <p key={i}>
                <span className="font-semibold">{s.title}:</span> {s.name}
              </p>
            ))}
          </div>
        </>
      )}

      

      {projects?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between items-center text-sm">
                <p className="font-medium">{i + 1}. {renderField(p.title)}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Project
                  </a>
                )}
              </div>
              {renderHTML(p.description, "text-[13px]")}
            </div>
          ))}
        </>
      )}

      {customSections?.map((section, i) => (
        section.items?.length > 0 && (
          <div key={i}>
            <h2 className="font-semibold border-b mt-4 mb-2">{section.title}</h2>
            {section.items.map((item, j) => (
              <div key={j} className="mb-2">
                <p className="font-medium">{item.title}</p>
                {renderHTML(item.description, "text-[13px]")}
              </div>
            ))}
          </div>
        )
      ))}

      {certifications?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Certifications</h2>
          {certifications.map((c, i) => (
            <p key={i}>{c.name} — {c.organization}</p>
          ))}
        </>
      )}

      {languages?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Languages</h2>
          <div className="flex flex-wrap gap-x-4">
            {languages.map((l, i) => (
              <p key={i}>
                <span className="font-semibold">{l.name}:</span> {l.proficiency}
              </p>
            ))}
          </div>
        </>
      )}

      {references?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">References</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            {references.map((r, i) => (
              <div key={i}>
                <p className="font-medium">{r.name}</p>
                <p className="text-sm">{r.company}</p>
                <p className="text-sm text-gray-600">{r.contact}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassicTemplate;
