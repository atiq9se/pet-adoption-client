import { FaAd, FaCalendar, FaDog, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import DashboardNavbar from "../Pages/Shared/Navbar/DashboardNavbar";
import logo from '../../src/assets/logo.png'


const DashboardLayout = () => {
    const [isAdmin] = useAdmin();

    return (


        <div className="flex flex-wrap">
            <div className="w-64 min-h-full bg-teal-200 h-screen">
            <Link to='/' className="text-xl font-bold"><img src={logo} alt="" className="md:w-60 w-48 pt-8 px-2"/> </Link>
            <div className="divider"></div>
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li> <NavLink to="/dashboard/users"><FaUser></FaUser>All users</NavLink></li>
                            <li> <NavLink to="/dashboard/allpets"><FaDog></FaDog> All Pets</NavLink></li>
                            <li> <NavLink to="/dashboard/allcampaigns"><FaAd></FaAd> All Donation Campaigns</NavLink></li>
                        </>
                            :
                            <>
                                <li> <NavLink to="/dashboard/addpet"><FaDog></FaDog> Add a pet </NavLink></li>
                                <li> <NavLink to="/dashboard/myAddedPets"><FaDog></FaDog> My added pets</NavLink></li>
                                <li> <NavLink to="/dashboard/adoptionRequest"><FaAd></FaAd> Adoption Request</NavLink></li>
                                <li> <NavLink to="/dashboard/createDonation"><FaList></FaList> Create Donation Campaign</NavLink></li>
                                <li> <NavLink to="/dashboard/myDonationCampaign"><FaList></FaList>My Donation Campaigns</NavLink></li>
                                <li> <NavLink to="/dashboard/myDonation"><FaList></FaList>My Donations</NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className="flex-1">
                <DashboardNavbar></DashboardNavbar>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;

