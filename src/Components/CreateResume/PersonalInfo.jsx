import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalInfo = ({ data, onSave, onValidityChange, onSubmitRef }) => {
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Personal Info</h2>

      <input
        className="input input-bordered w-full"
        placeholder="Full Name"
        {...register("fullName", { required: true })}
      />
      {errors.fullName && <p className="text-error">Required</p>}

      <input
        className="input input-bordered w-full"
        placeholder="Email"
        {...register("email", { required: true })}
      />

      <input
        className="input input-bordered w-full"
        placeholder="Phone"
        {...register("phone", { required: true })}
      />

      <input
        className="input input-bordered w-full"
        placeholder="Location"
        {...register("location", { required: true })}
      />
    </div>
  );
};

export default PersonalInfo;
