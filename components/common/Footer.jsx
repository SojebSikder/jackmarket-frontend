import Image from 'next/image';
import logo from "../../public/logo/jacmarketIcon.png";
import googlePlayImage from "../../public/DownloadApp/googlePlay.png";
import appleStore from "../../public/DownloadApp/appleStore.png";
import facebook from "../../public/SocialIcon/Facebook 1.png";
import instagram from "../../public/SocialIcon/Instagram 1.png";
import linkedin from "../../public/SocialIcon/Linkedin 1.png";

const Footer = () => {
    return (
      <div className=" border-t border-black lg:pt-14 ">
        <div className="lg:px-20 flex items-start justify-between lg:gap-52">
          <Image
            src={logo}
            alt=" jacmarket Icon"
            className="w-12 h-12 object-cover "
          />
          <div className=" grid grid-cols-3 gap-20  flex-1">
            {/* about*/}
            <div className="">
              <h3 className=" font-semibold text-secondary text-xl pb-4">
                About
              </h3>
              <p className=" font-semibold text-gray-700">Careers</p>
              <p className=" font-semibold text-gray-700">FAQ</p>
            </div>
            {/* social */}
            <div className="">
              <h3 className=" font-semibold text-secondary text-xl pb-4">
                Social
              </h3>
              <div className="flex items-center gap-3">
                <Image src={facebook} alt="facebook Image" />
                <Image src={linkedin} alt="linkedin image " />
                <Image src={instagram} alt="instagram image " />
              </div>
            </div>
            {/* Apps */}
            <div className="">
              <h3 className=" font-semibold text-secondary text-xl pb-4">
                Apps
              </h3>
              <Image
                src={googlePlayImage}
                alt="google Play store Image"
                className="w-24 mb-2"
              />
              <Image
                src={appleStore}
                alt="apple Store image "
                className="w-24 "
              />
            </div>
          </div>
        </div>
        <div className="bg-black h-[1px] my-7 mx-20 opacity-50  "></div>
        <div className='text-secondary flex items-center justify-center gap-5 font-semibold  mb-5'>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-100 active:scale-95 '>©  2022 Jeckmarket</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-100 active:scale-95 '>Imprint</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-100 active:scale-95 '>Terms of conditions</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-100 active:scale-95 '>Privacy</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-100 active:scale-95 '>Cookie settings</p>
        </div>
      </div>
    );
};

export default Footer;