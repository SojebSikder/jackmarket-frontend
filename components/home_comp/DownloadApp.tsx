import Image from "next/image";
import googlePlayImage from '../../public/DownloadApp/googlePlay.png'
import appleStore from '../../public/DownloadApp/appleStore.png'
import iphoneImage from '../../public/DownloadApp/iphoneImage.png'

const DownloadApp = () => {
    return (
      <div className=" md:flex  justify-between items-center  lg:px-32 md:px-20 px-5 md:pt-20 lg:pb-0 md:pb-12 h-screen md:mb-0  mb-60">
        <div>
          <h1 className=" font-bold text-3xl text-secondary pt-10 pb-10 ">
            Download Jeckmarket now.
          </h1>
          <p className=" pb-10 font-medium text-gray-700 ">
            All your grocery needs, delivered in minutes. Download <br /> now
            and start shopping with Flink.
          </p>
          <div className='md:flex-col flex md:justify-start justify-between  md:pb-0 pb-4'>
            <Image
              alt=""
              src={googlePlayImage}
              className=" lg:w-48 md:w-28 w-20 object-cover md:pb-5"
            />
            <Image
              alt=""
              src={appleStore}
              className=" lg:w-48 md:w-28 w-20 object-cover "
            />
          </div>
        </div>
        <div>
          <Image
            alt=""
            src={iphoneImage}
            className=" object-cover lg:w-[418px]"
          />
        </div>
      </div>
    );
};

export default DownloadApp;