import { FilePen, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { saveResume } from "../../api/resumeApi";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const extractTextFromPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    let allLinks = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      
      // Extract text content with line break detection
      const textContent = await page.getTextContent();
      const items = textContent.items;
      
      items.sort((a, b) => {
        if (Math.abs(a.transform[5] - b.transform[5]) > 2) {
          return b.transform[5] - a.transform[5];
        }
        return a.transform[4] - b.transform[4];
      });

      let pageText = "";
      let lastY = -1;
      
      items.forEach(item => {
        if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 2) {
          pageText += "\n";
        } else if (lastY !== -1) {
          // If on same line, ensure there is a space between tokens if needed
          if (!pageText.endsWith(" ") && !item.str.startsWith(" ")) {
            pageText += " ";
          }
        }
        pageText += item.str;
        lastY = item.transform[5];
      });

      fullText += pageText + "\n";

      // Extract links from annotations
      const annotations = await page.getAnnotations();
      const links = annotations
        .filter(anno => anno.subtype === "Link" && (anno.url || anno.unsafeUrl))
        .map(anno => anno.url || anno.unsafeUrl);
      
      allLinks = [...allLinks, ...links];
    }

    // Append unique links to the end of the text so AI can see them
    if (allLinks.length > 0) {
      const uniqueLinks = [...new Set(allLinks)];
      fullText += "\n--- HIDDEN HYPERLINKS IN DOCUMENT ---\n";
      fullText += uniqueLinks.join("\n");
      fullText += "\n-------------------------------------\n";
    }

    return fullText;
  };

  const parseResumeWithAI = async (text) => {
    if (!text || text.trim().length < 50) {
      throw new Error("The resume text seems too short or empty. Please try another PDF.");
    }

    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!API_KEY) {
      throw new Error("Groq API Key (VITE_GROQ_API_KEY) is not configured in the .env file.");
    }
    
    const prompt = `
      Extract information from the following resume text and format it into the specified JSON structure.
      Return ONLY the JSON. No markdown tags, no explanations.
      
      Critical Instructions:
      - **EDUCATION PRECISION**: When extracting education, separate the degree (e.g., "B.Sc.", "Bachelor") from the field of study (e.g., "Computer Science"). Do NOT repeat the field in both fields.
      - **NO GLUED SENTENCES**: Do NOT merge separate sentences or paragraphs into a single line without proper spacing or line breaks. If two blocks of text are distinct in the PDF, keep them distinct in the JSON.
      - **LIST RECONSTRUCTION**: Identify lists, sub-sections, or bullet points in the text. Every distinct achievement, feature, or responsibility MUST start on its own line with a dash (-).
      - **BULLET FORMATTING**: 
        - If the text uses roman numerals (e.g., i., ii., iii.) or numbers (e.g., 1., 2., 3.), **preserve them exactly**.
        - For ALL OTHER list items, achievements, features, or responsibilities (even if they have no symbol in the PDF), you MUST start the line with a single dash (-) followed by a space.
        - NEVER collapse multiple points into a single paragraph. Each point must be a separate line starting with a dash (-).
      - **FORCE NEW LINES**: Every achievement, responsibility, or key feature MUST start on its own line. Do NOT collapse multi-point lists into a single line or paragraph.
      - **MISSING DATA HANDLING**: If a required field is missing from the PDF, use the following placeholders:
        - "location" -> "Set Location"
        - "phone" -> "Set Phone"
        - "fullName" -> "Set Name"
        - "email" -> "Set Email"
        - "summary" -> "Set Summary"
        - "position" (in experience) -> "Set Position"
        - "company" (in experience) -> "Set Company"
        - "institution" (in education) -> "Set Institution"
        - "degree" (in education) -> "Set Degree"
      - **LINKS EXCLUSION**: For social/profile links (linkedin, github, behance, dribble, portfolio, project links), do NOT use placeholders. If missing, leave them as an empty string ("").
      - **SECTION CLASSIFICATION**: Carefully distinguish between "Professional Experience" (jobs, internships) and "Projects" (personal, academic, or open source). 
      - **NO MISCLASSIFICATION**: Do NOT put personal or academic projects into the "experience" section. If a project has a title but no formal company/employer, it belongs in "projects".
      - **STRICT EXPERIENCE**: Only populate the "experience" array if the document has a clear "Work Experience", "Professional History", or "Employment" section. If no such section exists, return "experience": [].
      - Extract the FULL, detailed descriptions for each entry in education, experience, and projects.
      - PRESERVE FORMATTING: Maintain the structural line breaks and paragraph breaks found in the text.
      - CLEAN DESCRIPTIONS: Do NOT include URLs or link-related text (e.g., "Live link", "GitHub Link") inside the "description" fields.
      - LINK ATTRIBUTION: Ensure any discovered URLs are placed in the appropriate "link" or social fields and NOT in the descriptions.
      
      Resume Text: ${text}

      Target JSON Schema:
      {
        "personal": { 
          "fullName": "string", 
          "email": "string", 
          "phone": "string", 
          "location": "string", 
          "linkedin": "string", 
          "github": "string", 
          "behance": "string", 
          "dribble": "string", 
          "portfolio": "string" 
        },
        "summary": { "summary": "string" },
        "education": [{ 
          "institution": "string", 
          "degree": "string", 
          "field": "string", 
          "startDate": "string (format: MM/YYYY)", 
          "endDate": "string (format: MM/YYYY or 'Present')", 
          "description": "string (FULL detailed description with structural line breaks, excluding links/labels)" 
        }],
        "experience": [{ 
          "company": "string", 
          "position": "string", 
          "location": "string", 
          "startDate": "string (format: MM/YYYY)", 
          "endDate": "string (format: MM/YYYY or 'Present')", 
          "description": "string (FULL detailed description with structural line breaks, excluding links/labels)" 
        }],
        "skills": [{ "name": "string" }],
        "projects": [{ 
          "title": "string", 
          "link": "string (Exact URL found in doc)", 
          "description": "string (FULL detailed description with structural line breaks, excluding links/labels)" 
        }],
        "certifications": [{ 
          "name": "string", 
          "title": "string", 
          "organization": "string", 
          "date": "string (format: MM/YYYY)" 
        }]
      }
    `;

    try {
      console.log(`Attempting to parse with Groq (llama-3.3-70b-versatile)...`);
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a professional resume parser. Extract data into precise JSON format."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      console.log("Success with Groq!");
      return JSON.parse(content);
    } catch (error) {
      console.error("Groq parsing failed:", error.message);
      throw new Error(`AI Parsing failed: ${error.message}`);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setIsProcessing(true);
    try {
      const text = await extractTextFromPdf(file);
      const parsedData = await parseResumeWithAI(text);
      
      // Auto-save to database if email is present
      if (parsedData.personal?.email) {
        try {
          console.log("Attempting auto-save to database...");
          await saveResume(parsedData);
          console.log("Auto-save successful!");
        } catch (saveError) {
          console.warn("Auto-save failed, but continuing to form:", saveError.message);
        }
      }

      navigate("/createresume", {
        state: { 
          newResume: true,
          resumeData: parsedData,
          autoPreview: true
        },
      });
    } catch (error) {
      alert("Error processing resume: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-5xl mx-auto md:my-16 my-2 md:mt-12  p-4 py-12 md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-xl">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="mb-2 text-3xl font-bold">Resume Builder</h1>
            <p className="text-gray-500">
              Choose how you'd like to create your resume
            </p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf"
            className="hidden"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Resume Card */}
            <div 
              className={`card border border-black/20 p-8 hover:shadow-lg transition-shadow cursor-pointer ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={!isProcessing ? handleUploadClick : undefined}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-200/30 rounded-lg flex items-center justify-center mb-4">
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 text-[#22A7F0] animate-spin" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#22A7F0]" />
                  )}
                </div>
                <h3 className="mb-2">{isProcessing ? "Processing..." : "Upload Resume"}</h3>
                <p className="text-gray-500 text-sm">
                  Upload your existing PDF document. Our AI will automatically extract your information.
                </p>
              </div>
            </div>

            {/* Create Manually Card */}
            <div
              className="card p-8 hover:shadow-lg transition-shadow cursor-pointer hover:border-2 border border-black/20  hover:border-[#22A7F0] "
              onClick={() =>
                navigate("/createresume", {
                  state: { newResume: true },
                })
              }
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-200/30 rounded-lg flex items-center justify-center mb-4">
                  <FilePen className="w-6 h-6 text-[#22A7F0]" />
                </div>
                <h3 className="mb-2">Create Manually</h3>
                <p className="text-gray-500 text-sm">
                  Build your resume from scratch with our step-by-step form
                  builder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;

