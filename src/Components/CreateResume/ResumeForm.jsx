import { useRef, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Summary from "./Summary";
import { saveResume } from "../../api/resumeApi";

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
  const [resumeId, setResumeId] = useState(null);

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
    let sectionData;

    if (submitRef.current) {
      sectionData = await submitRef.current();
    }

    const saved = await saveResume({
      _id: resumeId,
      [activeTab.toLowerCase()]: sectionData,
    });

    if (!resumeId) setResumeId(saved._id);

    const i = tabs.indexOf(activeTab);
    if (i < tabs.length - 1) setActiveTab(tabs[i + 1]);
  };

  const prev = () => {
    const i = tabs.indexOf(activeTab);
    if (i > 0) setActiveTab(tabs[i - 1]);
  };
  return (
    <div>
      <div className="max-w-5xl mx-auto p-6  md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-xl my-8">
        <button
          className="text-md flex justify-center items-center gap-2 cursor-pointer text-black/60 hover:text-black/30"
          onClick={() => window.history.back()}
        >
          <span>
            <MdKeyboardArrowLeft size={18} />
          </span>
          <span>Back to options</span>
        </button>
        <h1 className="text-3xl font-bold my-6">Create Your Resume</h1>

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
        {activeTab === "Summary" && (
          <Summary
            data={resumeData.summary}
            onSave={(data) => setResumeData((p) => ({ ...p, summary: data }))}
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

          <button
            onClick={next}
            disabled={!isValid}
            className="group disabled:cursor-not-allowed"
          >
            <div
              className={`
                  text-sm flex justify-center items-center px-3 py-2 rounded-sm text-white transition-colors
                    ${
                      !isValid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#22A7F0] hover:bg-[#1fa1e7] cursor-pointer"
                    }
                    `}
            >
              Next{" "}
              <span>
                <MdKeyboardArrowRight size={18} />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResumeForm;
