/**
 * Utility functions for AI-powered resume features.
 */

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

/**
 * Enhances the resume data using AI.
 * @param {Object} resumeData The current resume data.
 * @returns {Promise<Object>} The enhanced resume data.
 */
export const enhanceResumeWithAI = async (resumeData) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!API_KEY) {
    throw new Error("Groq API Key (VITE_GROQ_API_KEY) is not configured in the .env file.");
  }

  const prompt = `
    You are a professional resume expert and career coach. Your task is to enhance the provided resume data to make it more professional, impactful, and tailored for high-level job opportunities.

    Strict Instructions:
    1.  **Professional Summary**: Rewrite the summary to be compelling, concise, and focused on key achievements and skills.
    2.  **Experience Descriptions**: Improve each experience description. Use powerful action verbs (e.g., "Spearheaded", "Optimized", "Architected"), quantify achievements where possible, and ensure the tone is professional.
    3.  **Project Descriptions**: Enhance project descriptions to highlight technical complexity, problem-solving, and results.
    4.  **Formatting**: Maintain structural line breaks (each point on a new line starting with a dash "-").
    5.  **Data Integrity**: Do NOT change factual information like company names, institutions, dates, or contact info. ONLY enhance the descriptive text (summary and descriptions).
    6.  **Missing Data**: If a section is empty or has placeholders like "Set Summary", generate a high-quality professional default based on the rest of the resume's context (skills, education, etc.).
    7.  **Languages**: If the languages array is empty or missing, you MUST add exactly one entry: { "name": "English", "proficiency": "Basic" }.
    8.  **Output**: Return the ENTIRE resume object in the exact same JSON format as provided. Return ONLY the JSON. No markdown, no explanations.
    9. Make The Resume Professional and ATS friendly.

    Current Resume Data:
    ${JSON.stringify(resumeData, null, 2)}

    Target JSON Schema Example (for languages):
    "languages": [
      { "name": "English", "proficiency": "Basic" }
    ]
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional resume enhancer. Return ONLY precise enhanced JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Enhancement failed:", error.message);
    throw new Error(`AI Enhancement failed: ${error.message}`);
  }
};
