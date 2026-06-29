/* eslint-disable */

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Globe,
  Bell,
  Plus,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getResume,
  getUser,
  updateUser as updateUserData,
  getPreferences,
  updatePreferences,
} from "../../api/resumeApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft, Send, Trash2 } from "lucide-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activePrefModal, setActivePrefModal] = useState(null); // 'jobTitle', 'schedules', etc.
  //   const [jobAlert, setJobAlert] = useState({ title: "", location: "Remote" });

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.email) {
        try {
          // Fetch Resume Data
          const resume = await getResume(currentUser.email);
          if (resume) setResumeData(resume);

          // Fetch User Details from /users
          const user = await getUser(currentUser.email);
          if (user) setUserData(user);

          // Fetch Preferences
          const prefs = await getPreferences(currentUser.email);
          if (prefs) setPreferences(prefs);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleEditResume = () => {
    if (resumeData) {
      navigate("/createresume", {
        state: {
          resumeData: resumeData,
          autoPreview: false,
        },
      });
    } else {
      navigate("/resumebuilders");
    }
  };

  const handleUpdateContact = async (updatedInfo) => {
    try {
      await updateUserData(currentUser.email, updatedInfo);
      setUserData((prev) => ({ ...prev, ...updatedInfo }));
      setIsEditModalOpen(false);
    } catch (err) {
      alert("Failed to update contact info");
    }
  };

  const handleUpdatePreference = async (updatedPref) => {
    try {
      await updatePreferences(currentUser.email, updatedPref);
      setPreferences((prev) => ({ ...prev, ...updatedPref }));
      setActivePrefModal(null);
    } catch (err) {
      alert("Failed to update preference");
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return currentUser?.email?.[0]?.toUpperCase() || "U";
  };

  const sections = [
    {
      id: "contact",
      title: "Contact Information",
      icon: <User className="w-5 h-5" />,
      items: [
        {
          icon: <Mail className="w-4 h-4" />,
          value: userData?.email || currentUser?.email || "No email provided",
        },
        {
          icon: <Phone className="w-4 h-4" />,
          value:
            userData?.phone || resumeData?.personal?.phone || "No Phone Number",
        },
        {
          icon: <MapPin className="w-4 h-4" />,
          value:
            userData?.location || resumeData?.personal?.location || "Remote",
        },
      ],
    },
    {
      id: "resume",
      title: "Resume",
      custom: (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mt-2">
          <p className="text-sm font-semibold text-gray-700">
            {resumeData?.personal?.fullName
              ? `Resume-${resumeData.personal.fullName}.pdf`
              : "No resume found"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {resumeData
              ? "Ready for download • Searchable"
              : "Create your first resume to see it here"}
          </p>
          <button
            onClick={handleEditResume}
            className="mt-4 w-full md:w-auto bg-[#22A7F0] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1A91D9] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Edit2 className="w-4 h-4" />
            {resumeData ? "Edit on StepNext" : "Create Resume"}
          </button>
        </div>
      ),
    },
    {
      id: "preferences",
      title: "Preferences",
      description:
        "Update as needed to get better recommendations across StepNext. Employers may see these when your resume is set to public.",
      items: [
        {
          label: "Job title",
          value:
            preferences?.jobTitle ||
            resumeData?.experience?.[0]?.position ||
            "Add job title",
          id: "jobTitle",
        },
        {
          label: "Work schedule",
          value:
            preferences?.schedules?.length > 0
              ? preferences.schedules.join(", ")
              : "Add work schedule",
          id: "schedules",
        },
        {
          label: "Job types",
          value:
            preferences?.jobTypes?.length > 0
              ? preferences.jobTypes.join(", ")
              : "Add job types",
          id: "jobTypes",
        },
        {
          label: "Minimum base pay",
          value: preferences?.pay?.amount
            ? `৳ ${preferences.pay.amount} per ${preferences.pay.period}`
            : "Add pay",
          id: "pay",
        },
        {
          label: "Relocation",
          value: preferences?.relocation?.willing
            ? `Willing to relocate (${
                preferences.relocation.locations.filter(Boolean).join(", ") ||
                "Anywhere"
              })`
            : "Not willing to relocate",
          id: "relocation",
        },
        {
          label: "Remote",
          value: preferences?.remote || "Add remote preference",
          id: "remote",
        },
      ],
    },
    {
      id: "alerts",
      title: "Current job alerts",
      description:
        "You don't have any job alerts! Use the form below to create an alert, and we will keep you updated with the latest jobs.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#22A7F0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Profile Info */}
        <div className="text-center">
          <div className="w-16 h-16 bg-[#C026D3] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-sm uppercase overflow-hidden">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials()
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userData?.fullName || currentUser?.displayName}
          </h1>
        </div>

        {/* Info Banner */}
        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-lg p-4 flex items-center gap-3">
          <div className="text-[#22A7F0]">
            <Globe className="w-5 h-5" />
          </div>
          <p className="text-sm text-[#1E40AF]">
            This is your StepNext profile. Any changes you make here will be
            reflected across the platform.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h2>
                {(section.id === "resume" || section.id === "contact") && (
                  <button
                    onClick={
                      section.id === "contact"
                        ? () => setIsEditModalOpen(true)
                        : handleEditResume
                    }
                    className="text-[#22A7F0] hover:underline flex items-center gap-1 text-sm font-semibold cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                )}
              </div>

              {section.description && (
                <p className="text-sm text-gray-600 mb-6">
                  {section.description}
                </p>
              )}

              {section.items && (
                <div className="space-y-4">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col flex-1">
                          {section.id === "preferences" ? (
                            <>
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                {item.label}
                              </span>
                              <span
                                className={`text-md ${
                                  item.isLink
                                    ? "text-[#22A7F0] cursor-pointer hover:underline"
                                    : "text-gray-900"
                                }`}
                              >
                                {item.value}
                              </span>
                            </>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="text-gray-400">{item.icon}</div>
                              <span className="text-sm text-gray-700 font-medium">
                                {item.value}
                              </span>
                            </div>
                          )}
                        </div>

                        {section.id === "preferences" && (
                          <button
                            onClick={() => setActivePrefModal(item.id)}
                            className="text-[#22A7F0] hover:underline flex items-center gap-1.5 text-sm font-semibold cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </div>
                      {idx !== section.items.length - 1 && (
                        <div className="border-b border-gray-50 mt-4 mb-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.custom}
            </div>
          </div>
        ))}

        {/* Create Job Alert Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="bg-[#F0F9FF] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Create a new job alert
              </h2>
              <p className="text-center text-gray-600 text-sm mb-8">
                Enter a job title, keyword or company name and location to
                create a new job alert
              </p>

              <div className="space-y-6 max-w-sm mx-auto">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Job Title, Skills or Company{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Add job title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Remote"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  <Bell className="w-5 h-5 text-gray-500" />
                  Create Job Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Edit Modal */}
      {isEditModalOpen && (
        <ContactEditModal
          user={
            userData || {
              email: currentUser.email,
              fullName: currentUser.displayName,
            }
          }
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateContact}
        />
      )}

      {/* Preference Edit Modal */}
      {activePrefModal && (
        <PreferenceEditModal
          type={activePrefModal}
          preferences={preferences || {}}
          onClose={() => setActivePrefModal(null)}
          onSave={handleUpdatePreference}
        />
      )}
    </div>
  );
};

const ContactEditModal = ({ user, onClose, onSave }) => {
  const [firstName, setFirstName] = useState(
    user?.fullName?.split(" ")[0] || ""
  );
  const [lastName, setLastName] = useState(
    user?.fullName?.split(" ").slice(1).join(" ") || ""
  );
  const [phone, setPhone] = useState(user?.phone || "");
  const [location, setLocation] = useState(user?.location || "Remote");

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 ml-2">
            Contact Information
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed outline-none"
            />
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-md font-bold text-gray-900 mb-1">Location</h3>
            <p className="text-xs text-gray-500 mb-3">
              This helps match you with nearby jobs.
            </p>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                City, State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={() =>
              onSave({
                fullName: `${firstName} ${lastName}`.trim(),
                phone,
                location,
              })
            }
            className="bg-[#22A7F0] text-white px-10 py-2.5 rounded-full font-bold hover:bg-[#1A91D9] transition-all cursor-pointer shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const PreferenceEditModal = ({ type, preferences, onClose, onSave }) => {
  // Shared states
  const [title, setTitle] = useState(preferences.jobTitle || "");
  const [selectedSchedules, setSelectedSchedules] = useState(
    preferences.schedules || []
  );
  const [selectedJobTypes, setSelectedJobTypes] = useState(
    preferences.jobTypes || []
  );
  const [payAmount, setPayAmount] = useState(preferences.pay?.amount || "");
  const [payPeriod, setPayPeriod] = useState(
    preferences.pay?.period || "yearly"
  );
  const [willingToRelocate, setWillingToRelocate] = useState(
    preferences.relocation?.willing || false
  );
  const [relocationLocations, setRelocationLocations] = useState(
    preferences.relocation?.locations || ["", "", ""]
  );
  const [remotePreference, setRemotePreference] = useState(
    preferences.remote || ""
  );

  const scheduleOptions = {
    days: [
      "Monday to Friday",
      "Weekend availability",
      "Weekends only",
      "No weekends",
      "Holidays",
    ],
    shifts: [
      "4 hour shift",
      "8 hour shift",
      "10 hour shift",
      "12 hour shift",
      "Day shift",
      "Night shift",
      "Evening shift",
      "No nights",
      "Overnight shift",
      "After school",
    ],
    other: ["On call", "Self-determined schedule", "Overtime"],
  };

  const jobTypeOptions = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];
  const remoteOptions = [
    "Hybrid remote",
    "In-person",
    "Remote",
    "Temporarily remote",
  ];

  const handleToggle = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "jobTitle":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Job title</h3>
            <p className="text-sm text-gray-600">
              What is your desired job title?
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Junior Frontend Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22A7F0] focus:border-transparent outline-none"
            />
          </div>
        );
      case "schedules":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Work schedule</h3>
            <p className="text-sm text-gray-600">
              What are your desired schedules?
            </p>
            {Object.entries(scheduleOptions).map(([category, options]) => (
              <div key={category}>
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-3">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        handleToggle(
                          opt,
                          selectedSchedules,
                          setSelectedSchedules
                        )
                      }
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                        selectedSchedules.includes(opt)
                          ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "jobTypes":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Job types</h3>
            <p className="text-sm text-gray-600">
              What are your desired job types?
            </p>
            <div className="flex flex-wrap gap-2">
              {jobTypeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    handleToggle(opt, selectedJobTypes, setSelectedJobTypes)
                  }
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    selectedJobTypes.includes(opt)
                      ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case "pay":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Pay</h3>
            <p className="text-sm text-gray-600">
              What is the minimum pay you'll consider in your search?
            </p>
            <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                We use this information to improve the jobs we show you.
                Employers won't see this.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Minimum base pay
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#22A7F0]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Pay period
                </label>
                <select
                  value={payPeriod}
                  onChange={(e) => setPayPeriod(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#22A7F0] appearance-none cursor-pointer"
                >
                  <option value="yearly">yearly</option>
                  <option value="monthly">monthly</option>
                  <option value="weekly">weekly</option>
                  <option value="hourly">hourly</option>
                </select>
              </div>
            </div>
          </div>
        );
      case "relocation":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Relocation</h3>
            <p className="text-sm text-gray-600">
              Are you willing to relocate?
            </p>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={willingToRelocate}
                onChange={(e) => setWillingToRelocate(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#22A7F0] focus:ring-[#22A7F0]"
              />
              <span className="text-md font-medium text-gray-900 group-hover:text-black">
                Yes, I'm willing to relocate
              </span>
            </label>

            {willingToRelocate && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <p className="text-sm font-bold text-gray-700">
                  Add up to three locations
                </p>
                {relocationLocations.map((loc, idx) => (
                  <div key={idx}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      {idx === 0 ? "First" : idx === 1 ? "Second" : "Third"}{" "}
                      location preference
                    </label>
                    <input
                      type="text"
                      value={loc}
                      onChange={(e) => {
                        const newLocs = [...relocationLocations];
                        newLocs[idx] = e.target.value;
                        setRelocationLocations(newLocs);
                      }}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#22A7F0]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "remote":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Remote</h3>
            <p className="text-sm text-gray-600">
              What is your desired work setting?
            </p>
            <div className="flex flex-wrap gap-2">
              {remoteOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRemotePreference(opt)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    remotePreference === opt
                      ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getPayload = () => {
    switch (type) {
      case "jobTitle":
        return { jobTitle: title };
      case "schedules":
        return { schedules: selectedSchedules };
      case "jobTypes":
        return { jobTypes: selectedJobTypes };
      case "pay":
        return { pay: { amount: payAmount, period: payPeriod } };
      case "relocation":
        return {
          relocation: {
            willing: willingToRelocate,
            locations: relocationLocations,
          },
        };
      case "remote":
        return { remote: remotePreference };
      default:
        return {};
    }
  };

  const handleRemove = () => {
    let emptyPayload = {};
    switch (type) {
      case "jobTitle":
        emptyPayload = { jobTitle: "" };
        break;
      case "schedules":
        emptyPayload = { schedules: [] };
        break;
      case "jobTypes":
        emptyPayload = { jobTypes: [] };
        break;
      case "pay":
        emptyPayload = { pay: { amount: "", period: "yearly" } };
        break;
      case "relocation":
        emptyPayload = {
          relocation: { willing: false, locations: ["", "", ""] },
        };
        break;
      case "remote":
        emptyPayload = { remote: "" };
        break;
    }
    onSave(emptyPayload);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-8 pb-10">{renderContent()}</div>

        <div className="p-6 bg-gray-50 flex items-center justify-between border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => onSave(getPayload())}
              className="bg-[#22A7F0] text-white px-10 py-2.5 rounded-full font-bold hover:bg-[#1A91D9] transition-all cursor-pointer shadow-md text-md"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-full font-bold border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-600 font-bold hover:underline cursor-pointer flex items-center gap-1.5"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
