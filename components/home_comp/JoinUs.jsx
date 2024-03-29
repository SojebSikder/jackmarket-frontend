


import Button from '../common/Button';

const JoinUs = () => {
    return (
      <div>
        {/* country */}
        <div className=" flex  items-center md:gap-10 gap-3  mb-10 lg:px-32 md:px-10 px-5">
          <p className=" p-2 md:px-8 px-4  md:text-base text-xs bg-[#D1DBF1] text-secondary rounded font-semibold ">
            Germany
          </p>
          <p className=" p-2 md:px-8 px-4 md:text-base text-xs my-5 md:my-0 bg-[#D1DBF1] text-secondary rounded font-semibold ">
            France
          </p>
          <p className=" p-2 md:px-8 px-4 md:text-base text-xs bg-[#D1DBF1] text-secondary rounded font-semibold ">
            Netherlands
          </p>
        </div>
        {/* main content*/}
        <div
          className={` relative bg-[url('/JoinUs/bg_image.png')]  h-[50vh] md:h-screen w-full bg-cover bg-no-repeat flex justify-end overflow-hidden`}
        >
          <div className="relative w-4/5  bg-[#002855] h-full -skew-x-[28deg] translate-x-[410px]"></div>
          <div className=" absolute z-10 bottom-0 right-0 my-16 w-96 mx-20 text-end  text-white ">
            <h1 className=" font-bold text-4xl  pb-5 ">Join us as a rider!</h1>
            <p className="  font-medium text-white/50 mb-16">
              Benefit from an attractive hourly salary with tips, a discount on
              all groceries, free professional gear, subsidized phone data,
              bonus opportunities, and more.
            </p>
            <Button>Ride with us</Button>
          </div>
        </div>
      </div>
    );
};

export default JoinUs;

