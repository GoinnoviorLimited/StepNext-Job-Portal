import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Skills = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillsList, setSkillsList] = useState(data.length ? data : []);

  const {
    control,
    register,
    trigger,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      skills: data.length ? data : [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      const values = getValues().skills;
      onSave(values);
      return values;
    };
  }, [trigger, getValues, onSave, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    // Check if skill already exists (case-insensitive)
    const skillExists = skillsList.some(
      skill => skill.name.toLowerCase() === newSkill.trim().toLowerCase()
    );
    
    if (skillExists) {
      // will add a toast here
      alert("Skill already exists");
      return;
    }

    // Add new skill to both the form and local state
    const newSkillObj = { name: newSkill.trim() };
    append(newSkillObj);
    setSkillsList(prev => [...prev, newSkillObj]);
    setNewSkill("");
  };

  const handleRemoveSkill = (index) => {
    remove(index);
    setSkillsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="rounded-lg space-y-4 bg-base-100">
        {/* Add Skills Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Add Skills <span className="text-error">*</span>
            </span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a skill and press Enter"
              className="input focus:outline-none w-full"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
            >
              Add
            </button>
          </div>
          <label className="label">
            <span className="label-text text-wrap text-gray-500">
              Add technical skills, soft skills, languages, or tools you're proficient in.
            </span>
          </label>
        </div>

        {/* Skills List */}
        <div>
          {skillsList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p>No skills added yet. Add at least one skill to continue.</p>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <span className="font-medium">Your Skills ({skillsList.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl"
                  >
                    <span>{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-gray-500 hover:text-red-600 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hidden form fields for react-hook-form validation */}
      {fields.map((field, index) => (
        <input
          key={field.id}
          type="hidden"
          {...register(`skills.${index}.name`, { required: true })}
        />
      ))}
    </div>
  );
};

export default Skills;