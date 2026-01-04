import { useNavigate } from "react-router-dom";
import ClassicTemplate from "../Resume/Templates/ClassicTemplate";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { useEffect, useState } from "react";

const Preview = ({ initialData }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /* ================= PDF ================= */
  const downloadPDF = async () => {
    if (!data || isDownloading) return;

    setIsDownloading(true);

    try {
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

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setIsDownloading(false); // Reset loading state
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
  /* ================= WORD ================= */

  return (
    <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Preview & Download</h2>
          <p className="text-gray-600 mt-1">
            Review your resume before downloading
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/templates");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
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
          Change Template
        </button>
      </div>

      {/* A4 PAGE PREVIEW */}
      <div className="bg-gray-50 p-8 flex justify-center rounded-lg">
        <div className="relative">
          <div
            id="element-to-print"
            className="bg-white w-[210mm] min-h-[297mm] p-10 shadow-lg rounded"
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

          <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500">
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
          className={`cursor-pointer px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg  ${
            isDownloading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
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
              <span>Download PDF</span>
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
