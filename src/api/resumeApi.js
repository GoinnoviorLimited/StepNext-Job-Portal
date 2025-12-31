const API_URL = "http://localhost:3000";

export const saveResume = async (data) => {
  const res = await fetch(`${API_URL}/userData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};
