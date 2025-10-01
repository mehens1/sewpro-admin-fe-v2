import React from "react";

const Button = ({
  children,
  onClick,
  type = "button", 
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles =
    "w-full  px-4 py-2 font-semibold rounded-lg transition focus:outline-none";

  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
