import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import RichTextEditor from "../Common/RichTextEditor";

const Education = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      education: data.length ? data : [{}],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.education);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  // expose submit to parent
  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().education;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>

      {fields.map((item, index) => (
        <div
          key={item.id}
          className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-4 bg-base-100"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Education {index + 1}</h3>
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

          {/* Institution */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Institution <span className="text-error">*</span>
              </span>
            </label>
            <input
              placeholder="University Name"
              className="input focus:outline-none w-full"
              {...register(`education.${index}.institution`, {
                required: true,
              })}
            />
            {errors.education && (
              <span className="text-error text-sm">Required</span>
            )}
          </div>

          {/* Degree + Field */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Degree <span className="text-error">*</span>
                </span>
              </label>
              <input
                placeholder="Bachelor's, Master's, etc."
                className="input focus:outline-none w-full"
                {...register(`education.${index}.degree`, {
                  required: true,
                })}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Field of Study</span>
              </label>
              <input
                placeholder="Computer Science, Business, etc."
                className="input focus:outline-none w-full"
                {...register(`education.${index}.field`)}
              />
            </div>
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
                {...register(`education.${index}.startDate`)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">End Date</span>
              </label>
              <input
                placeholder="MM/YYYY or Present"
                className="input focus:outline-none w-full"
                {...register(`education.${index}.endDate`)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Description (Optional)
              </span>
            </label>
            <Controller
              name={`education.${index}.description`}
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Relevant coursework, achievements, GPA, etc."
                />
              )}
            />
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        onClick={() => append({})}
        className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
      >
        + Add Another Education
      </button>
    </div>
  );
};

export default Education;
