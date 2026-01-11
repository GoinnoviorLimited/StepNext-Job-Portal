import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Skills = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [skillsList, setSkillsList] = useState(Array.isArray(data) ? data : []);

  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      skills: Array.isArray(data) ? data : [],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.skills);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().skills;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleAddSkill = () => {
    if (!newTitle.trim() || !newSkills.trim()) return;
    
    // Check if category title already exists (case-insensitive)
    const categoryExists = skillsList.some(
      item => item.title.toLowerCase() === newTitle.trim().toLowerCase()
    );
    
    if (categoryExists) {
      alert("This category already exists");
      return;
    }

    // Add new skill category to both the form and local state
    const newSkillObj = { 
      title: newTitle.trim(), 
      name: newSkills.trim() 
    };
    append(newSkillObj);
    setSkillsList(prev => [...prev, newSkillObj]);
    setNewTitle("");
    setNewSkills("");
  };

  const handleRemoveSkill = (index) => {
    remove(index);
    setSkillsList(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="rounded-lg space-y-4 bg-base-100">
        {/* Add Skills Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Category Title <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Front End"
              className="input focus:outline-none w-full"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Skills <span className="text-error">*</span>
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. HTML, CSS, React"
                className="input focus:outline-none w-full"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <label className="label pt-0">
          <span className="label-text text-wrap text-gray-500">
            Categorize your skills (e.g., Title: "Frontend", Skills: "React, Vue").
          </span>
        </label>

        {/* Skills List */}
        <div className="mt-6">
          {skillsList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p>No skills added yet. Add at least one skill category to continue.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-2">
                <span className="font-medium">Your Skills ({skillsList.length})</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {skillsList.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 group shadow-sm"
                  >
                    <div className="flex-1">
                      <span className="font-bold text-[#22A7F0] block mb-1">{skill.title}</span>
                      <span className="text-gray-700">{skill.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden form fields for react-hook-form validation */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            type="hidden"
            {...register(`skills.${index}.title`, { required: true })}
          />
          <input
            type="hidden"
            {...register(`skills.${index}.name`, { required: true })}
          />
        </div>
      ))}
    </div>
  );
};

export default Skills;