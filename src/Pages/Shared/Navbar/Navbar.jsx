import { useContext } from "react";
import { Link } from "react-router-dom";

import { CiShoppingCart } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";



const Navbar = () => {
    const { user, logOut } = useAuth();
  

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "User Logout successfully",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
             })
            .catch(errors => console.log(errors))
    }

    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/petListing'>Pet Listing</Link></li>
        <li><Link to='/donation-campaigns'>Donation Campaigns</Link></li>
        {
            user ?  <li>
            <details>
              <summary><img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" /></summary>
              <ul className="p-2">
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><button onClick={handleSignOut}>Logout</button></li>
              </ul>
            </details>
          </li> : <><li><Link to='/login'>Login</Link></li></>
        }
    </>


    return (
        <div className="navbar z-10 bg-base-100 lg:px-24 md:px-12 px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/' className="text-xl font-bold">Pet Adoption </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;