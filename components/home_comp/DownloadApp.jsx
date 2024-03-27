import Image from "next/image";
import googlePlayImage from '../../public/DownloadApp/googlePlay.png'
import appleStore from '../../public/DownloadApp/appleStore.png'
import iphoneImage from '../../public/DownloadApp/iphoneImage.png'

const DownloadApp = () => {
    return (
      <div className=" flex justify-between items-center  lg:px-32 pt-20 h-screen">
        <div>
          <h1 className=" font-bold text-3xl text-secondary pt-10 pb-10 ">
            Download Jeckmarket now.
          </h1>
          <p className=" pb-10 font-medium text-gray-700 ">
            All your grocery needs, delivered in minutes. Download <br /> now
            and start shopping with Flink.
          </p>
          <Image
            alt=""
            src={googlePlayImage}
            className=" w-48 object-cover mb-5"
          />
          <Image alt="" src={appleStore} className=" w-48 object-cover " />
        </div>
        <div>
          <Image alt="" src={iphoneImage} className=" object-cover w-[418px]" />
        </div>
      </div>
    );
};

export default DownloadApp;