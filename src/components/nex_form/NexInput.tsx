"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

interface NexInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const NexInput: React.FC<NexInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...register(name, { required })}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${className} ${
          errorMessage
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        }`}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default NexInput;
