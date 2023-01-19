import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      style={{
        // width: "144px",
        color: "white",
        backgroundColor: "var(--primary-color)",
      }}
      className="btn"
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
