// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../provider/AuthProvider";
import { CiShoppingCart } from "react-icons/ci";
// import useCart from "../../hooks/useCart";
// import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    // const { user, logOut } = useAuth();
    // const [cart] = useCart();

    // const handleSignOut = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(errors => console.log(errors))
    // }

    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Pet Listing</Link></li>
        <li><Link to='/order/salad'>Donation Campaigns</Link></li>
        <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Dashboard</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Login</summary>
          <ul className="p-2">
            <li><a>Dashboard</a></li>
            <li><a>Logout</a></li>
          </ul>
        </details>
      </li>
 
        {/* {
            user ? <><span>{user?.displayName}</span><img src={user.photoURL} alt="" className="w-12" /><button onClick={handleSignOut}>LOGOUT</button></> : <><li><Link to='/login'>Login</Link></li></>
        } */}
    </>


    return (
        <div className="navbar z-10 bg-base-100">
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
                <a className="btn btn-ghost text-xl">Pet Adoption </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;