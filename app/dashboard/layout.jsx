
import DashboardNav from './../../components/Dashboard/DashboardNav';
import DashboardSideBar from './../../components/Dashboard/DashboardSideBar';
const dashboard = ({children}) => {
    return (
        <div>
            <div>
                <DashboardNav/>
            </div>
            <div>
                <DashboardSideBar/>
            </div>
        </div>
    );
};

export default dashboard;