import { useNavigate } from "react-router-dom";
import ClassicTemplate from "../Resume/Templates/ClassicTemplate";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

// import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const Preview = ({ data }) => {
  const navigate = useNavigate();

  /* ================= PDF ================= */
  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data?.personal?.fullName || "resume"}.pdf`);
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
          className="cursor-pointer px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <FaFilePdf />
          Download PDF
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
