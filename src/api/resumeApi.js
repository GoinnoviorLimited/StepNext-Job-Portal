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

export const getResume = async (email) => {
  try {
    const response = await fetch(`${API_URL}/userData?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const result = await response.json();
    console.log("Find User by Email Result:", result);
    
    // 1. Match the email to find the record (handle array response)
    const userRecord = Array.isArray(result) ? result[0] : (result.data ? result.data[0] : null);
    
    if (!userRecord || !userRecord._id) {
      console.warn("No user ID found for this email");
      return null;
    }

    // 2. Use the ID to fetch from /userData/:id
    const id = userRecord._id;
    console.log(`Fetching detailed data for ID: ${id}`);
    
    const idResponse = await fetch(`${API_URL}/userData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!idResponse.ok) {
      throw new Error(`Failed to fetch data by ID: ${idResponse.status}`);
    }

    const userData = await idResponse.json();
    console.log("Final User Data by ID:", userData);
    return userData;
  } catch (error) {
    console.error("Get resume error:", error);
    throw error;
  }
};

export const saveUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to save user: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Save user error:", error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch user: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const updateUser = async (email, updates) => {
  try {
    const response = await fetch(`${API_URL}/users/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

export const savePreferences = async (data) => {
  try {
    const response = await fetch(`${API_URL}/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save preferences: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Save preferences error:", error);
    throw error;
  }
};

export const getPreferences = async (email) => {
  try {
    const response = await fetch(`${API_URL}/preferences/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch preferences: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Get preferences error:", error);
    throw error;
  }
};

export const updatePreferences = async (email, updates) => {
  try {
    const response = await fetch(`${API_URL}/preferences/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update preferences: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update preferences error:", error);
    throw error;
  }
};
