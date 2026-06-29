import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import MonthYearPicker from "../Common/MonthYearPicker";

const Certifications = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      certifications: data.length ? data : [],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.certifications);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().certifications;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid,onValidityChange]);

  const handleAddFirstCertification = () => {
    if (fields.length === 0) {
      append({});
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Certifications</h2>

      {fields.length === 0 ? (
        // Empty state
        <div className="space-y-4">
          <p className="text-gray-600">
            Optional: Add professional certifications, licenses, or awards.
          </p>
          
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
            <p className="text-gray-500 mb-4">
              No certifications added yet. This section is optional.
            </p>
            <button
              type="button"
              onClick={handleAddFirstCertification}
              className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
            >
              + Add Your First Certification
            </button>
          </div>
        </div>
      ) : (
        // Certifications list
        <div className="space-y-8">
          {/* Instruction text at top */}
          <p className="text-gray-600">
            Optional: Add professional certifications, licenses, or awards.
          </p>

          {fields.map((item, index) => (
            <div 
              key={item.id} 
              className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-6 bg-base-100"
            >
              {/* Header with Certification Number and Delete */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Certification Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Certification Name</span>
                </label>
                <input
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className="input focus:outline-none w-full"
                  {...register(`certifications.${index}.name`)}
                />
              </div>

              {/* Certification Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Certification Title</span>
                </label>
                <input
                  placeholder="e.g., Associate, Professional, Expert"
                  className="input focus:outline-none w-full"
                  {...register(`certifications.${index}.title`)}
                />
              </div>

              {/* Issuing Organization and Date Obtained - Two Columns */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Issuing Organization</span>
                  </label>
                  <input
                    placeholder="e.g., AWS, Google, Microsoft"
                    className="input focus:outline-none w-full"
                    {...register(`certifications.${index}.organization`)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Date Obtained</span>
                  </label>
                  <Controller
                    name={`certifications.${index}.date`}
                    control={control}
                    render={({ field }) => (
                      <MonthYearPicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select date"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add Another Certification button */}
          <button
            type="button"
            onClick={() => append({})}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#22A7F0] hover:text-[#22A7F0] transition-colors"
          >
            + Add Another Certification
          </button>
        </div>
      )}
    </div>
  );
};

export default Certifications;