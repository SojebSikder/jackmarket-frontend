import RootNavbar from "../components/home_comp/RootNavbar";
import Banner from "../components/home_comp/Banner";
import Essentials from './../components/home_comp/Essentials';
import Advertise1 from './../components/home_comp/Advertise1';
import WhyChooseUs from './../components/home_comp/WhyChooseUs';

const page = () => {

  return (
    <div className=" font-inter">
      <RootNavbar />
      <Banner/>
      <Essentials/>
      <Advertise1/>
      <WhyChooseUs/>
      

    </div>
  );
};

export default page;