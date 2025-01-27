import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const MyDonationCampaign = () => {
    const { user } = useContext(AuthContext)
    const [campaigns, setCampaigns] = useState([])
    const axiosSecure = useAxiosSecure();

    useEffect(() => {

        fetch(`http://localhost:5000/campaigns?email=${user.email}`)
            .then(res => res.json())
            .then(data => setPets(data))


    }, [user.email])

    return (
        <div>
            <Helmet>
                <title>My added Pet </title>
            </Helmet>
            <h2> MY ADDED PETS</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Maximum Donation Amount</th>
                            <th>Donation Status</th>
                            <th>Edit</th>
                            <th>View Donator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pets.map((pet, index) =>
                                <tr key={pet._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {pet.name}
                                    </td>
                                    <td>{pet.category}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={pet.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">adoption{pet.adoption_status}</button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updatePet/${pet._id}`}><button className="btn btn-ghost"><FaEdit className="text-orange-600"></FaEdit></button></Link>
                                        <button onClick={() => handleDeletePet(pet)} className="btn btn-ghost"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDonationCampaign;