import { useRef, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
      <div className="max-w-5xl mx-auto p-6  shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-xl my-8">
        <h1 className="text-3xl font-bold mb-4">Create Resume</h1>

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 grid grid-cols-4 lg:grid-cols-8 gap-2 ">
          {tabs.map((t) => (
            <button
              key={t}
              className={`text-xs cursor-default py-2 ${
                activeTab === t
                  ? "bg-[#22A7F0] rounded-md text-white"
                  : "bg-[#22A7F0]/10 rounded-md text-black/60"
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
          <div onClick={prev}>
            <div className="text-sm opacity-60 hover:opacity-80 flex justify-center items-center px-3 py-2 rounded-sm bg-[#22A7F0]/20 cursor-pointer">
              <span>
                <MdKeyboardArrowLeft size={18} />
              </span>
              <span>Previous</span>
            </div>
          </div>

          <div onClick={next} disabled={!isValid}>
            <div className="text-sm flex justify-center items-center px-3 py-2 rounded-sm bg-[#22A7F0] hover:bg-[#1fa1e7] text-white  cursor-pointer">
              Next{" "}
              <span>
                <MdKeyboardArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
