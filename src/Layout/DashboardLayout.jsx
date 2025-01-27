import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const DashboardLayout = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className="w-64 min-h-full bg-teal-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li> <NavLink to="/dashboard/users"><FaUser></FaUser>All users</NavLink></li>
                            <li> <NavLink to="/dashboard/addpet"><FaCalendar></FaCalendar> Add a pet </NavLink></li>
                            <li> <NavLink to="/dashboard/allpets"><FaShoppingCart></FaShoppingCart> All Pets</NavLink></li>
                        </>
                            :
                            <>
                                <li> <NavLink to="/dashboard/addpet"><FaCalendar></FaCalendar> Add a pet </NavLink></li>
                                <li> <NavLink to="/dashboard/myAddedPets"><FaShoppingCart></FaShoppingCart> My added pets</NavLink></li>
                                <li> <NavLink to="/dashboard/adoptionRequest"><FaAd></FaAd> Adoption Request</NavLink></li>
                                <li> <NavLink to="/dashboard/createDonation"><FaList></FaList> Create Donation Campaign</NavLink></li>
                                <li> <NavLink to="/dashboard/myDonationCampaign"><FaList></FaList>My Donation Campaigns</NavLink></li>
                                <li> <NavLink to="/dashboard/myDonation"><FaList></FaList>My Donations</NavLink></li>
                            </>
                    }



                    <div className="divider"></div>
                    <li> <NavLink to="/"><FaHome></FaHome> Home</NavLink></li>
                    <li> <NavLink to="/order/salad"><FaSearch></FaSearch>Menu</NavLink></li>
                    <li> <NavLink to="/order/contact"><FaEnvelope></FaEnvelope> Contact</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;

