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

        fetch(`http://localhost:5000/mycampaigns?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCampaigns(data))

    }, [user.email])

    return (
        <div>
            <Helmet>
                <title>My Donation Campaign </title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>My Donation Campaign List</h3>

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
                            campaigns.map((campaign, index) =>
                                <tr key={campaign._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {campaign.name}
                                    </td>
                                    <td>{campaign.donation_amount}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">{campaign.paused_status}</button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateCampaign/${campaign._id}`}><button className="btn btn-ghost"><FaEdit className="text-orange-600"></FaEdit></button></Link>
                                    </td>
                                    <td>
                                        views
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