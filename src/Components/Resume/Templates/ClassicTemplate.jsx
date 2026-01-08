const ClassicTemplate = ({ data }) => {
  const { personal, summary, education, experience, skills, projects, certifications } = data;

  return (
    <div className="text-black text-[14px] leading-relaxed">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{personal?.fullName}</h1>
        <p className="text-sm">
          {personal?.email} • {personal?.phone} • {personal?.location}
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
          <p>{summary.summary}</p>
        </>
      )}

      {education?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Education</h2>
          {education.map((e, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <p className="font-medium">{e.institution}</p>
                <p>{e.degree} {e.field && `in ${e.field}`}</p>
              </div>
              <p>{e.startDate} – {e.endDate}</p>
            </div>
          ))}
        </>
      )}

      {experience?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Experience</h2>
          {experience.map((ex, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between">
                <p className="font-medium">{ex.position} — {ex.company}</p>
                <p>{ex.startDate} – {ex.endDate}</p>
              </div>
              <p>{ex.description}</p>
            </div>
          ))}
        </>
      )}

      {skills?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Skills</h2>
          <p>{skills.map(s => s.name).join(", ")}</p>
        </>
      )}

      {projects?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Projects</h2>
          {projects.map((p, i) => (
            <div key={i}>
              <p className="font-medium">{p.title}</p>
              <p>{p.description}</p>
            </div>
          ))}
        </>
      )}

      {certifications?.length > 0 && (
        <>
          <h2 className="font-semibold border-b mt-4 mb-2">Certifications</h2>
          {certifications.map((c, i) => (
            <p key={i}>{c.name} — {c.organization}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default ClassicTemplate;
