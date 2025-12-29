import { useRef, useState } from "react";
import PersonalInfo from "./PersonalInfo";

const tabs = [
  "Personal",
  "Summary",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certifications",
  "Preview",
];

const ResumeForm = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [isValid, setIsValid] = useState(false);

  const submitRef = useRef(null);
  const [resumeData, setResumeData] = useState({
    personal: {},
    summary: {},
    education: [],
    experience: [],
    skills: {},
    projects: [],
    certifications: [],
  });

  const next = async () => {
    if (submitRef.current) {
      await submitRef.current();
    }

    const i = tabs.indexOf(activeTab);
    if (i < tabs.length - 1) {
      setActiveTab(tabs[i + 1]);
    }
  };

  const prev = () => {
    const i = tabs.indexOf(activeTab);
    if (i > 0) setActiveTab(tabs[i - 1]);
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Create Resume</h1>

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 grid grid-cols-4 lg:grid-cols-8 gap-2 ">
          {tabs.map((t) => (
            <button
              key={t}
              className={`text-xs cursor-default py-2 ${
                activeTab === t ? "bg-[#22A7F0] rounded-md text-white" : "bg-[#22A7F0]/10 rounded-md text-black/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Sections */}
        {activeTab === "Personal" && (
          <PersonalInfo
            data={resumeData.personal}
            onSave={(data) => setResumeData((p) => ({ ...p, personal: data }))}
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={prev}>
            Previous
          </button>

          <button
            className="bg-[#22A7F0] text-white btn"
            onClick={next}
            disabled={!isValid}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
