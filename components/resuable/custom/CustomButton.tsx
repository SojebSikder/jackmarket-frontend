import React from "react";

export default function CustomButton({
  children,
  ...props
}: {
  children?: any;
}) {
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
}
