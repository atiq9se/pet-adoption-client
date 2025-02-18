import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../../provider/AuthProvider";

const AdoptionRequest = () => {
    const { user } = useContext(AuthContext)
    const [adoptions, setAdoptions] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(() => {

        fetch(`https://b10-a12-server-omega.vercel.app/adoptionRequest?email=${user.email}`)
            .then(res => res.json())
            .then(data => setAdoptions(data))


    }, [user.email])

    return (
        <div>
            <Helmet>
                <title>My Adoption Request</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>My Adoption Request</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Pet Name</th>
                            <th>Pet Photo</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Phone</th>
                            <th>User Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adoptions.map((adoption, index) =>
                                <tr key={adoption._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {adoption.name}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={adoption.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{adoption.requestor_name}</td>
                                    
                                    <td>
                                       {adoption.requestor_email}
                                    </td>
                                    <td>
                                       {adoption.requestor_phone}
                                    </td>
                                    <td>
                                       {adoption.requestor_address}
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdoptionRequest;