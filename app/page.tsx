import RootNavbar from "../components/home_comp/RootNavbar";
import Banner from "../components/home_comp/Banner";
import Essentials from './../components/home_comp/Essentials';

const page = () => {

  return (
    <div className=" font-inter">
      <RootNavbar />
      <Banner/>
      <Essentials/>

    </div>
  );
};

export default page;