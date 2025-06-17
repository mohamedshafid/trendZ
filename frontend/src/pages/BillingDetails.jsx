import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  MapPin,
  Building2,
  Landmark,
  Globe,
  NotebookPen,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppContext } from "../contexts/AppContext";
import { useAddress } from "../hooks/useAddress";

// 🧠 Billing schema
const BillingSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number"),
  street: z.string().min(3, "Street is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(4, "Pincode is required"),
  country: z.string().min(2, "Country is required").default("India"),
});

const BillingDetails = () => {
  const { formRef, setUser } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      country: "India",
    },
  });

  const { mutate: submitAddress } = useAddress();

  const onSubmit = (data) => {
    submitAddress(data, {
      onSuccess: (res) => {
        toast.success("Billing details submitted!");
        reset();
        const updatedAddress = res?.data?.address;

        if (updatedAddress) {
          setUser((prevUser) => ({
            ...prevUser,
            address: updatedAddress,
          }));
        }
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "Failed to submit billing info."
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl bg-white border border-white/20 rounded-3xl p-10 shadow-xl text-black transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-medium text-primary ">
            Address Details
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          ref={formRef}
        >
          {/* Grid layout for better grouping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="phone"
              label="Phone Number"
              placeholder="9876543210"
              icon={Phone}
              register={register("phone")}
              error={errors.phone}
            />

            <FormField
              id="country"
              label="Country"
              placeholder="India"
              icon={Globe}
              register={register("country")}
              error={errors.country}
            />

            <FormField
              id="city"
              label="City"
              placeholder="Chennai"
              icon={Building2}
              register={register("city")}
              error={errors.city}
            />

            <FormField
              id="pincode"
              label="Pincode"
              placeholder="600001"
              icon={Landmark}
              register={register("pincode")}
              error={errors.pincode}
            />
          </div>

          {/* Full-width row for street */}
          <FormField
            id="street"
            label="Street Address"
            placeholder="123 Main St"
            icon={MapPin}
            register={register("street")}
            error={errors.street}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-primary/90 transition"
          >
            Save Address Details
          </button>
        </form>
      </div>
    </div>
  );
};

// 🌟 Reusable Field Component
const FormField = ({ id, label, placeholder, icon: Icon, register, error }) => {
  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          {...register}
          className="pl-10 w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-2 font-Rubik shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default BillingDetails;
