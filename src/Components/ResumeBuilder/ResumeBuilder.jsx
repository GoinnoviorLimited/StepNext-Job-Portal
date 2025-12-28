import { FilePen, Upload } from "lucide-react";

const ResumeBuilder = ({ onCreateManually }) => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="mb-2">Resume Builder</h1>
            <p className="text-gray-500">
              Choose how you'd like to create your resume
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Resume Card */}
            <div className="p-8 hover:shadow-lg transition-shadow cursor-not-allowed opacity-60">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-200/30 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-[#22A7F0]" />
                </div>
                <h3 className="mb-2">Upload Resume</h3>
                <p className="text-gray-500 text-sm">
                  Upload your existing PDF or Word document. We'll extract and
                  enhance it.
                </p>
              </div>
            </div>

            {/* Create Manually Card */}
            <div
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#22A7F0]"
              onClick={onCreateManually}
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
