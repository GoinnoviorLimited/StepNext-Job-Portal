import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import RichTextEditor from "../Common/RichTextEditor";

const Summary = ({ data, onSave, onValidityChange, onSubmitRef }) => {
  const {
    control,
    trigger,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: data,
    mode: "onChange",
  });

  // Real-time updates
  useEffect(() => {
    const subscription = watch((value) => {
      onSave(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger(); //validate form
      if (!valid) return null;

      return getValues(); 
    };
  }, [trigger, getValues, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);
  return (
    <div>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Summary <span className="text-error">*</span>
            </span>
          </label>
          <Controller
            name="summary"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Write a brief professional summary highlighting your key skills and experience..."
              />
            )}
          />
          {errors.summary && (
            <span className="text-error text-sm">Required</span>
          )}
        </div>
        <p className="text-xs text-black/40">
          Recommended: 2-3 sentences that highlight your experience, skills, and
          career goals.
        </p>
      </div>
    </div>
  );
};

export default Summary;
