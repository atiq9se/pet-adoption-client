import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from '../../../../src/assets/logo.png'

import { CiShoppingCart } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const DashboardNavbar = () => {
    const { user, logOut } = useAuth();
    const navigate =useNavigate();
  

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
                   navigate('/login')
             })
            .catch(errors => console.log(errors))
    }

    const navOptions = <>
        {
            user ?  
            
            <li>
            <details>
              <summary><img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" /></summary>
              <ul className="">
                <li><button onClick={handleSignOut}>Logout</button></li>
              </ul>
            </details>
          </li> : <></>
        }
    </>

    return (
        <div className="navbar sticky top-0 z-10 bg-teal-100">
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
                
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
        </div>
    );
};

export default DashboardNavbar;