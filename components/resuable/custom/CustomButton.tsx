import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        ...props.style,
        // width: "144px",
        color: "white",
        backgroundColor: "var(--primary-color)",
      }}
      className="btn"
    >
      {children}
    </button>
  );
};

export default CustomButton;
