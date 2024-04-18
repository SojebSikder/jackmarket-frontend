import Image from 'next/image';
import logo from "../../public/logo/jacmarketIcon.png";
import googlePlayImage from "../../public/DownloadApp/googlePlay.png";
import appleStore from "../../public/DownloadApp/appleStore.png";
import facebook from "../../public/SocialIcon/Facebook_1.png";
import instagram from "../../public/SocialIcon/Instagram_1.png";
import linkedin from "../../public/SocialIcon/LinkedIn_1.png";

const Footer = () => {
    return (
      <div className=" border-t  border-gray-500 md:pt-14 pt-10 pb-5 ">
        <div className="md:px-20 px-5  md:flex items-start justify-between lg:gap-52">
          <Image
            src={logo}
            alt=" jacmarket Icon"
            className="w-12 h-12 lg:mr-0 md:mr-16 md:mb-0 mb-5 object-cover "
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
              <div className="md:flex items-center gap-3">
                <Image src={facebook} alt="facebook Image" />
                <Image src={linkedin} alt="linkedin image " className='md:my-0 my-2' />
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
        <div className=" border-[0.1px] border-gray-400  md:mx-20 mx-5  my-4  "></div>
        <div className='text-secondary md:flex items-center justify-center gap-5 font-semibold text-center'>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-200 active:scale-95 '>©  2022 Jeckmarket</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-200 active:scale-95 '>Imprint</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-200 active:scale-95 '>Terms of conditions</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-200 active:scale-95 '>Privacy</p>
          <p className=' cursor-pointer hover:opacity-100 opacity-75 duration-200 active:scale-95 '>Cookie settings</p>
        </div>
      </div>
    );
};

export default Footer;