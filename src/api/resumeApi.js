export const saveResume = async (resumeData) => {
  const res = await fetch("http://localhost:3000/userData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resumeData),
  });

  if (!res.ok) throw new Error("Failed to save resume");
  return res.json();
};
