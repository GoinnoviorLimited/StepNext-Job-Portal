import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalInfo = ({ data, onSave, onValidityChange, onSubmitRef }) => {
  const {
    register,
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
            {...register("fullName", { required: "Required" })}
          />
          {errors.fullName && (
            <span className="text-error text-sm">{errors.fullName.message}</span>
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
            {...register("email", { 
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email"
              }
            })}
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">
              Phone <span className="text-error">*</span>
            </span>
          </label>
          <input
            placeholder="+880 17123-45627"
            className="input focus:outline-none w-full"
            {...register("phone", { 
              required: "Required",
              validate: (value) => {
                if (!value) return "Required";
                const is11Digits = /^\d{11}$/.test(value);
                const is14WithCode = /^\+880\d{10}$/.test(value);
                return is11Digits || is14WithCode || "Phone must be 11 digits or 14 characters with +880";
              }
            })}
          />
          {errors.phone && (
            <span className="text-error text-sm">{errors.phone.message}</span>
          )}
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
            {...register("location", { required: "Required" })}
          />
          {errors.location && (
            <span className="text-error text-sm">{errors.location.message}</span>
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
            placeholder="https://linkedin.com/johndoe"
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
            placeholder="https://github.com/johndoe"
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
            placeholder="https://behance.net/johndoe"
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
            placeholder="https://dribble.com/johndoe"
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
            placeholder="https://www.johndoe.com"
            className="input focus:outline-none w-full"
            {...register("portfolio", { required: false })}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
