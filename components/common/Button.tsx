const Button = ({
  children,
  color = "bg-primary",
  onClick,
}: {
  children: any;
  color?: "bg-primary" | "bg-secondary";
  onClick?: () => void;
}) => {
  // const colorClasses = {
  //   primary: "bg-primary",
  //   secondary: "bg-secondary",
  // };

  return (
    <button
      // {...props}
      onClick={onClick}
      className={` rounded p-2 px-4 font-semibold text-white ${color} duration-300 active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Button;
