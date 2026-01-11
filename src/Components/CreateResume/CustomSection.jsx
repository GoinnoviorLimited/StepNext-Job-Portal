import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import RichTextEditor from "../Common/RichTextEditor";

const CustomSection = ({ title, data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      items: data.length ? data : [],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.items);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().items;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleAddFirstItem = () => {
    if (fields.length === 0) {
      append({ title: "", description: "" });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      {fields.length === 0 ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Add items to your custom section "{title}".
          </p>
          
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
            <p className="text-gray-500 mb-4">
              No items added yet.
            </p>
            <button
              type="button"
              onClick={handleAddFirstItem}
              className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
            >
              + Add First Item
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-gray-600">
            Add items to your custom section "{title}".
          </p>

          {fields.map((item, index) => (
            <div 
              key={item.id} 
              className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-6 bg-base-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Item {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    placeholder="e.g., Volunteer Work, Publications, Projects"
                    className="input focus:outline-none w-full"
                    {...register(`items.${index}.title`)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <Controller
                    name={`items.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Provide details about this item..."
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ title: "", description: "" })}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#22A7F0] hover:text-[#22A7F0] transition-colors"
          >
            + Add Another Item
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomSection;
