import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

const Languages = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      languages: data.length ? data : [],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.languages);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().languages;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleAddFirstLanguage = () => {
    if (fields.length === 0) {
      append({ name: "", proficiency: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Languages</h2>

      {fields.length === 0 ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Optional: Add languages you are proficient in.
          </p>
          
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
            <p className="text-gray-500 mb-4">
              No languages added yet. This section is optional.
            </p>
            <button
              type="button"
              onClick={handleAddFirstLanguage}
              className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
            >
              + Add Your First Language
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-gray-600">
            Optional: Add languages you are proficient in.
          </p>

          {fields.map((item, index) => (
            <div 
              key={item.id} 
              className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-6 bg-base-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Language {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Language Name</span>
                  </label>
                  <input
                    placeholder="e.g., English, Spanish, German"
                    className="input focus:outline-none w-full"
                    {...register(`languages.${index}.name`)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Proficiency</span>
                  </label>
                  <select
                    className="select select-bordered focus:outline-none w-full"
                    {...register(`languages.${index}.proficiency`)}
                  >
                    <option value="">Select Proficiency</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "", proficiency: "" })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#22A7F0] hover:text-[#22A7F0] transition-colors"
          >
            + Add Another Language
          </button>
        </div>
      )}
    </div>
  );
};

export default Languages;
