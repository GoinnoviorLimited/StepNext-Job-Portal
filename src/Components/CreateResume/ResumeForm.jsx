/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Summary from "./Summary";
import { saveResume } from "../../api/resumeApi";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Preview from "./Preview";
import Languages from "./Languages";
import References from "./References";
import CustomSection from "./CustomSection";
import { useLocation } from "react-router";

const initialTabs = [
  "Personal",
  "Summary",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certifications",
];

const finalTabs = ["Preview"];

const ResumeForm = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const [unlockedIdx, setUnlockedIdx] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const isNewResume = location.state?.newResume === true;
  const submitRef = useRef(null);
  const [resumeData, setResumeData] = useState(() => {
    const defaultData = {
      personal: {},
      summary: {},
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      references: [],
      customSections: [],
    };
    return { ...defaultData, ...location.state?.resumeData };
  });

  const [tabs, setTabs] = useState(() => {
    const customTabs = (location.state?.resumeData?.customSections || []).map(s => s.title);
    return [...initialTabs, "Languages", "References", ...customTabs, ...finalTabs];
  });
  
  const formatUrls = (data) => {
    const fields = ["linkedin", "github", "behance", "dribble", "portfolio"];
    const personal = { ...data.personal };
    
    fields.forEach(field => {
      if (personal[field] && personal[field].trim() !== "" && !personal[field].startsWith("http")) {
        personal[field] = `https://${personal[field]}`;
      }
    });

    return { ...data, personal };
  };

  useEffect(() => {
    if (location.state?.autoPreview) {
      setActiveTab("Preview");
    }
  }, [location.state, setActiveTab]);

  // Update unlockedIdx if coming from Auto Preview or already has data
  useEffect(() => {
    if (location.state?.autoPreview) {
      setUnlockedIdx(tabs.length - 1);
      setActiveTab("Preview");
    } else if (location.state?.resumeData) {
      // If we have parsed data (from PDF upload), unlocking all tabs so user can check anything
      setUnlockedIdx(tabs.length - 1);
    }
  }, [location.state]);

  const handleSaveResume = async (silent = false) => {
    try {
      if (!resumeData.personal?.email) {
        if (!silent) {
          alert("Please provide an email address in Personal Information section");
          setActiveTab("Personal");
        }
        return false;
      }

      const payload = { ...resumeData };
      delete payload._id;

      // Final URL formatting before submission
      const finalPayload = formatUrls(payload);

      const saved = await saveResume(finalPayload);

      if (!silent) {
        alert(
          saved.isNew
            ? "Resume saved successfully!"
            : "Resume updated successfully!"
        );
      }
      return true;
    } catch (error) {
      console.error("Save error:", error);
      if (!silent) {
        alert(error.message || "Failed to save resume. Please try again.");
      }
      return false;
    }
  };

  const next = async () => {
    // We still need to validate before moving forward
    if (submitRef.current) {
      const sectionData = await submitRef.current();
      if (!sectionData) return;
    }

    // Format URLs if we are leaving the Personal section
    if (activeTab === "Personal") {
      setResumeData(prev => formatUrls(prev));
    }

    const currentIndex = tabs.indexOf(activeTab);

    if (activeTab === "Preview") {
      await handleSaveResume();
      return;
    }

    const nextIdx = currentIndex + 1;
    if (nextIdx > unlockedIdx) {
      setUnlockedIdx(nextIdx);
    }
    setActiveTab(tabs[nextIdx]);
  };

  const prev = () => {
    const i = tabs.indexOf(activeTab);
    if (i > 0) setActiveTab(tabs[i - 1]);
  };

  const handleTabClick = (t, index) => {
    if (index <= unlockedIdx) {
      // Format URLs if we are leaving the Personal section via tab click
      if (activeTab === "Personal") {
        setResumeData(prev => formatUrls(prev));
      }
      setActiveTab(t);
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto p-6  md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-xl my-8">
        <button
          className="text-md flex justify-center items-center gap-2 cursor-pointer text-black/60 hover:text-black/30"
          onClick={() => {
            window.history.back();
          }}
        >
          <span>
            <MdKeyboardArrowLeft size={18} />
          </span>
          <span>Back to options</span>
        </button>
        <h1 className="text-3xl font-bold my-6">Create Your Resume</h1>

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-6 grid grid-cols-4 lg:grid-cols-8 gap-2 items-center">
          {tabs.map((t, index) => (
            <button
              key={t}
              onClick={() => handleTabClick(t, index)}
              className={`text-xs py-2 transition-all ${
                activeTab === t
                  ? "bg-[#22A7F0] rounded-md text-white cursor-pointer shadow-sm"
                  : index <= unlockedIdx
                  ? "bg-[#22A7F0]/20 rounded-md text-black/80 cursor-pointer hover:bg-[#22A7F0]/30"
                  : "bg-gray-100 rounded-md text-black/30 cursor-not-allowed opacity-60"
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => {
              const sectionName = prompt("Enter Custom Section Name:");
              if (sectionName && !tabs.includes(sectionName)) {
                setResumeData(prev => ({
                  ...prev,
                  customSections: [...prev.customSections, { title: sectionName, items: [] }]
                }));
                const newTabs = [...tabs];
                newTabs.splice(tabs.length - 1, 0, sectionName);
                setTabs(newTabs);
                setActiveTab(sectionName);
                setUnlockedIdx(newTabs.indexOf(sectionName));
              }
            }}
            className="text-xs py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-all font-semibold"
          >
            + Add Custom
          </button>
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
        {activeTab === "Education" && (
          <Education
            data={resumeData.education}
            onSave={(data) => setResumeData((p) => ({ ...p, education: data }))}
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}
        {activeTab === "Experience" && (
          <Experience
            data={resumeData.experience}
            onSave={(data) =>
              setResumeData((p) => ({ ...p, experience: data }))
            }
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}
        {activeTab === "Skills" && (
          <Skills
            data={resumeData.skills}
            onSave={(data) => setResumeData((p) => ({ ...p, skills: data }))}
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        {activeTab === "Projects" && (
          <Projects
            data={resumeData.projects}
            onSave={(data) => setResumeData((p) => ({ ...p, projects: data }))}
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        {activeTab === "Certifications" && (
          <Certifications
            data={resumeData.certifications}
            onSave={(data) =>
              setResumeData((p) => ({ ...p, certifications: data }))
            }
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        {activeTab === "Languages" && (
          <Languages
            data={resumeData.languages}
            onSave={(data) =>
              setResumeData((p) => ({ ...p, languages: data }))
            }
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        {activeTab === "References" && (
          <References
            data={resumeData.references}
            onSave={(data) =>
              setResumeData((p) => ({ ...p, references: data }))
            }
            onValidityChange={setIsValid}
            onSubmitRef={submitRef}
          />
        )}

        {resumeData.customSections.map((section, idx) => (
          activeTab === section.title && (
            <CustomSection
              key={idx}
              title={section.title}
              data={section.items}
              onSave={(items) => {
                const newSections = [...resumeData.customSections];
                newSections[idx] = { ...newSections[idx], items };
                setResumeData(p => ({ ...p, customSections: newSections }));
              }}
              onValidityChange={setIsValid}
              onSubmitRef={submitRef}
            />
          )
        ))}

        {activeTab === "Preview" && (
          <Preview 
            initialData={resumeData} 
            onSaveResume={handleSaveResume} 
            onDataUpdate={(updatedData) => setResumeData(updatedData)}
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
            disabled={!isValid && activeTab !== "Preview"}
            className="group disabled:cursor-not-allowed"
          >
            <div
              className={`
      text-sm flex justify-center items-center gap-1 px-4 py-2 rounded-sm text-white transition-colors
      ${
        !isValid && activeTab !== "Preview"
          ? "bg-gray-400 cursor-not-allowed"
          : activeTab === "Preview"
          ? "bg-[#22A7F0] hover:bg-[#1fa1e7] cursor-pointer"
          : "bg-[#22A7F0] hover:bg-[#1fa1e7] cursor-pointer"
      }
    `}
            >
              {activeTab === "Preview" ? (
                <>Submit CV</>
              ) : (
                <>
                  Next
                  <MdKeyboardArrowRight size={18} />
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResumeForm;
