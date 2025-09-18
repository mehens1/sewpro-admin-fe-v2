import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Inputs = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  disabled = false,
  placeholder,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;


  return (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id ?? name}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {isPasswordField && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-9 right-3 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default Inputs;


