import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalInfo = ({ data, onSave, onValidityChange, onSubmitRef }) => {
  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: data,
    mode: "onChange",
  });

  
  useEffect(() => {
    onSubmitRef.current = async () => {
      const valid = await trigger(); //validate form
      if (!valid) return null;

      const values = getValues(); // get form data
      onSave(values);
      return values; 
    };
  }, [trigger, getValues, onSave, onSubmitRef]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Full Name <span className="text-error">*</span>
            </span>
          </label>
          <input
            placeholder="John Doe"
            className="input focus:outline-none  w-full"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="text-error text-sm">Required</span>
          )}
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Email <span className="text-error">*</span>
            </span>
          </label>
          <input
            placeholder="john@example.com"
            className="input focus:outline-none w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-error text-sm">Required</span>}
        </div>

        {/* Phone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Phone <span className="text-error">*</span>
            </span>
          </label>
          <input
            placeholder="+880 (17) 123-45627"
            className="input focus:outline-none w-full"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span className="text-error text-sm">Required</span>}
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Address <span className="text-error">*</span>
            </span>
          </label>
          <input
            placeholder="City, State"
            className="input focus:outline-none w-full"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="text-error text-sm">Required</span>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {/* linkedin */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">LinkedIn</span>
          </label>
          <input
            placeholder="linkedin.com/johndoe"
            className="input focus:outline-none w-full"
            {...register("linkedin", { required: false })}
          />
        </div>
        {/* GitHub */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">GitHub</span>
          </label>
          <input
            placeholder="github.com/johndoe"
            className="input focus:outline-none w-full"
            {...register("github", { required: false })}
          />
        </div>
        {/* Behance */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Behance</span>
          </label>
          <input
            placeholder="behance.net/johndoe"
            className="input focus:outline-none w-full"
            {...register("behance", { required: false })}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Dribble */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Dribble</span>
          </label>
          <input
            placeholder="dribble.com/johndoe"
            className="input focus:outline-none w-full"
            {...register("dribble", { required: false })}
          />
        </div>
        {/* Portfolio */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Portfolio</span>
          </label>
          <input
            placeholder="www.johndoe.com"
            className="input focus:outline-none w-full"
            {...register("portfolio", { required: false })}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
