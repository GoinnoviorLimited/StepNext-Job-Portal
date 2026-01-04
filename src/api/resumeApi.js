const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://stepnext-jobportal-server-production.up.railway.app";

export const saveResume = async (data) => {
  try {
    if (!data.personal?.email) {
      throw new Error("Email is required to save resume");
    }

    const payload = { ...data };
    delete payload._id;

    const response = await fetch(`${API_URL}/userData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Server is on Sleep, Refresh the Server API! status: ${response.status}`
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Save failed");
    }

    return result;
  } catch (error) {
    console.error("Save resume error:", error);
    throw error;
  }
};
