import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

const Experience = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      experience: data.length ? data : [{}],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      const values = getValues().experience;
      onSave(values);
      return values;
    };
  }, [trigger, getValues, onSave, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Work Experience</h2>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-4 bg-base-100"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Experience {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {/* Company + Position */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Company <span className="text-error">*</span>
                </span>
              </label>
              <input
                placeholder="Company Name"
                className="input focus:outline-none w-full"
                {...register(`experience.${index}.company`, {
                  required: true,
                })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Position <span className="text-error">*</span>
                </span>
              </label>
              <input
                placeholder="Job Title"
                className="input focus:outline-none w-full"
                {...register(`experience.${index}.position`, {
                  required: true,
                })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <input
              placeholder="City, State/Country"
              className="input focus:outline-none w-full"
              {...register(`experience.${index}.location`)}
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Start Date</span>
              </label>
              <input
                placeholder="MM/YYYY"
                className="input focus:outline-none w-full"
                {...register(`experience.${index}.startDate`)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">End Date</span>
              </label>
              <input
                placeholder="MM/YYYY or Present"
                className="input focus:outline-none w-full"
                {...register(`experience.${index}.endDate`)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              className="textarea focus:outline-none w-full"
              {...register(`experience.${index}.description`)}
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        onClick={() => append({})}
        className="btn  bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
      >
        + Add Another Experience
      </button>
    </div>
  );
};

export default Experience;
