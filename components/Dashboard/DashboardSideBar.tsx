
import NavLinks from './NavLinks';
const DashboardSideBar = ({ isActiveMenu, setIsActiveMenu, pathname }) => {
  return (
    <div className="p-2">
      <div className=" flex items-center  gap-1 shadow-md  shadow-gray-400 rounded cursor-pointer duration-200 active:scale-95">
        <h2 className=" text-blue-600 bg-gray-100 p-2 px-3 m-2 rounded-md font-bold text-xs text-center">
          12 <br /> min.
        </h2>
        <div>
          <p className=" font-semibold text-gray-400 text-[12px] pb-1 ">
            We need your address
          </p>
          <p className=" font-bold text-red-400 text-[14px]">
            Add delivery address
          </p>
        </div>
      </div>
      <NavLinks pathname={pathname} isActiveMenu={isActiveMenu} />
    </div>
  );
};

export default DashboardSideBar;