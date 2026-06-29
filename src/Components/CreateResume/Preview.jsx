import { useNavigate } from "react-router-dom";
import ClassicTemplate from "../Resume/Templates/ClassicTemplate";
import { FaFilePdf, FaFileWord, FaMagic } from "react-icons/fa";
import { useEffect, useState } from "react";
import { enhanceResumeWithAI } from "../../utils/aiUtils";

const Preview = ({ initialData, onSaveResume, onDataUpdate }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /* ================= PDF ================= */
  const downloadPDF = async () => {
    if (!data || isDownloading) return;

    setIsDownloading(true);

    try {
      // Save data to database first (silent save)
      if (onSaveResume) {
        const success = await onSaveResume(true);
        if (!success) {
          setIsDownloading(false);
          return; 
        }
      }
      const timestamp = Date.now();
      const apiUrl = `https://stepnext-jobportal-server-production.up.railway.app/generate-pdf?timestamp=${timestamp}`;

      console.log("Starting PDF download...");

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const blob = await res.blob();

      if (!blob || blob.size === 0) {
        throw new Error("Empty PDF response");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.download = `${data.personal?.fullName || "resume"}_${Date.now()}.pdf`;
      a.href = url;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();

      console.log("PDF download initiated successfully");

      
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setIsDownloading(false); // Reseting  loading state
      }, 100);
    } catch (err) {
      setIsDownloading(false);

      // Only show alert if it's not a CORS warning (PDF might still download)
      if (!err.message.includes("Failed to fetch")) {
        alert(`Failed to download PDF: ${err.message}`);
      } else {
        setIsDownloading(false);
      }
    } finally {
      // reseting loading state, whether success or error
      setIsDownloading(false);
    }
  };

  /* ================= AI ENHANCE ================= */
  const handleEnhance = async () => {
    if (isEnhancing) return;
    setIsEnhancing(true);
    try {
      const enhancedData = await enhanceResumeWithAI(data);
      if (onDataUpdate) {
        onDataUpdate(enhancedData);
      }
      setData(enhancedData);
      alert("Resume enhanced successfully with AI!");
    } catch (error) {
      alert("Failed to enhance resume: " + error.message);
    } finally {
      setIsEnhancing(false);
    }
  };
  /* ================= WORD ================= */

  return (
    <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Preview & Download</h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Review your resume before downloading
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleEnhance}
            disabled={isEnhancing}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm font-bold text-sm cursor-pointer ${
              isEnhancing
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                : "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 active:scale-95"
            }`}
          >
            {isEnhancing ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <FaMagic className="text-purple-500" />
            )}
            <span className="whitespace-nowrap">{isEnhancing ? "Enhancing..." : "Enhance with AI"}</span>
          </button>

          <button
            onClick={(e) => {
            e.stopPropagation();
            navigate("/templates");
          }}
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-bold shadow-sm text-sm active:scale-95 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span className="whitespace-nowrap">Change Template</span>
        </button>
        </div>
      </div>

      {/* A4 PAGE PREVIEW */}
      <div className="bg-gray-100 p-2 sm:p-4 md:p-8 flex justify-center rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative origin-top transition-all duration-300 w-[210mm] scale-[0.4] mb-[-178mm] sm:scale-[0.6] sm:mb-[-119mm] md:scale-[0.8] md:mb-[-59mm] lg:scale-100 lg:mb-0">
          <div
            id="element-to-print"
            className="bg-white w-[210mm] min-h-[297mm] p-10 shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <ClassicTemplate data={data} />

            {/* Hidden download buttons inside the PDF area */}
            <div style={{ display: "none" }}>
              <div className="pdf-download-buttons">
                {/* This ensures buttons don't appear in PDF */}
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute -bottom-8 left-0 right-0 text-center text-sm font-medium text-gray-500">
            This is how your PDF will look
          </div>
        </div>
      </div>

      <div
        className="flex justify-center gap-4 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={downloadPDF}
          disabled={isDownloading}
          className={`cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg font-bold ${
            isDownloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white active:scale-95"
          }`}
        >
          {isDownloading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FaFilePdf />
              <span>Download PDF & Submit</span>
            </>
          )}
        </button>

        {/* <button
          onClick={downloadWord}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaFileWord />
          Download Word
        </button> */}
      </div>

      {/* Troubleshooting tips */}
      <div className="text-center text-sm text-gray-500">
        <p>If downloads don't start, check your browser's pop-up blocker</p>
        <p className="text-xs mt-1">
          Make sure all required fields are filled before downloading
        </p>
      </div>
    </div>
  );
};

export default Preview;
