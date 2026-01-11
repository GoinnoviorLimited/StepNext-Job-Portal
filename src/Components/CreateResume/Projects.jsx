import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import RichTextEditor from "../Common/RichTextEditor";

const Projects = ({ data = [], onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    register,
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      projects: data.length ? data : [],
    },
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value.projects);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger();
      if (!valid) return null;

      return getValues().projects;
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  const handleAddFirstProject = () => {
    if (fields.length === 0) {
      append({});
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Projects & Publications</h2>

      {fields.length === 0 ? (
        // Empty state
        <div className=" rounded-lg space-y-4 bg-base-100">
          <p className="text-gray-600">
            Optional: Add notable projects, publications, or portfolio work.
          </p>

          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500 mb-4">
              No projects added yet. This section is optional but recommended.
            </p>
            <button
              type="button"
              onClick={handleAddFirstProject}
              className="btn bg-[#22A7F0]/10 border-none hover:bg-[#1A91D9]/10 text-[#22A7F0]"
            >
              + Add Your First Project
            </button>
          </div>
        </div>
      ) : (
        // Projects list
        <div className="space-y-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-lg space-y-6 bg-base-100"
            >
              {/* Header with Project Number and Delete */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Project Title */}
              <div className="space-y-2">
                <h4 className="font-medium">Project Title</h4>
                <input
                  placeholder="Project Name"
                  className="input focus:outline-none w-full"
                  {...register(`projects.${index}.title`)}
                />
              </div>

              {/* Project Link */}
              <div className="space-y-2">
                <h4 className="font-medium">Link (Optional)</h4>
                <input
                  placeholder="https://project-link.com"
                  className="input focus:outline-none w-full"
                  {...register(`projects.${index}.link`)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <Controller
                  name={`projects.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Describe the project, your role, technologies used, and outcomes..."
                    />
                  )}
                />
              </div>

              {/* Divider between projects */}
              {index < fields.length - 1 && (
                <div className="border-t pt-6 mt-4">
                  <div className="text-center">
                    <div className="inline-block h-px w-16 bg-gray-300"></div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Another Project Button */}
          <button
            type="button"
            onClick={() => append({})}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#22A7F0] hover:text-[#22A7F0] transition-colors"
          >
            + Add Another Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
