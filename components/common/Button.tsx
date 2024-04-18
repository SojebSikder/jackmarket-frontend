const Button = ({ children }: { children: any }) => {
  return (
    <button className=" rounded p-2 px-4 font-semibold text-white bg-primary duration-300 active:scale-95">
      {children}
    </button>
  );
};

export default Button;
