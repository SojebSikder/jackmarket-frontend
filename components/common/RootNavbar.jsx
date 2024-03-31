
const RootNavbar = () => {
    return (
      <div className="bg-[#1C4DB9] z-[999] fixed w-full p-3 flex item-center justify-between lg:px-16 md:px-10  ">
        <h2 className="text-white font-inter pt-2 text-xs pr-3 md:pr-0">
          Apply as a rider and get up to 100$ sing-on bonus, 20% off
          groceries,and more!{" "}
        </h2>
        <button className="bg-white md:p-2 p-1 md:px-8 px-4 rounded-2xl font-semibold md:text-base text-xs duration-300 active:scale-95">
          Apply
        </button>
      </div>
    );
};

export default RootNavbar;