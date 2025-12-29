import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Summary = ({ data, onSave, onValidityChange, onSubmitRef }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: data,
    mode: "onChange",
  });
  // expose submit function to parent
  useEffect(() => {
    onSubmitRef.current = handleSubmit((formData) => {
      onSave(formData);
      return true;
    });
  }, [handleSubmit, onSave, onSubmitRef]);

  // inform parent if form is valid
  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);
  return (
    <div>
      <form className="space-y-6">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Summary <span className="text-error">*</span>
            </span>
          </label>
          <textarea
            rows={6}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            className="textarea focus:outline-none w-full "
            {...register("summary", { required: true })}
          />
          {errors.summary && (
            <span className="text-error text-sm">Required</span>
          )}
        </div>
        <p className="text-xs text-black/40">
          Recommended: 2-3 sentences that highlight your experience, skills, and
          career goals.
        </p>
      </form>
    </div>
  );
};

export default Summary;
