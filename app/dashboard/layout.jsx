
import DashboardNav from './../../components/Dashboard/DashboardNav';
import DashboardSideBar from './../../components/Dashboard/DashboardSideBar';
import Footer from './../../components/common/Footer';
const Dashboard = ({children}) => {
    return (
      <div>
        <div>
          <DashboardNav />
        </div>
        <div className=" flex  h-screen w-full ">
          <div className="border-r border-gray-300 p-2 h-screen">
            <DashboardSideBar />
          </div>
          <div className="p-3 bg-slate-400 w-full  ">{children}
           <Footer />
          </div>
        </div>
       
      </div>
    );
};

export default Dashboard;