import RootNavbar from "../components/common/RootNavbar";
import Banner from "../components/home_comp/Banner";
import Essentials from './../components/home_comp/Essentials';
import Advertise1 from './../components/home_comp/Advertise1';
import WhyChooseUs from './../components/home_comp/WhyChooseUs';
import Delivery from './../components/home_comp/Delivery';
import JoinUs from '../components/home_comp/JoinUs';
import DownloadApp from './../components/home_comp/DownloadApp';
import Footer from './../components/common/Footer';



const Page = () => {

  return (
    <div className=" font-inter">
      <RootNavbar />
      <Banner/>
      <Essentials/>
      <Advertise1/>
      <WhyChooseUs/>
      <Delivery/>
      <JoinUs/>
      <DownloadApp/>
      <Footer/>
      

    </div>
  );
};

export default Page;