import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useCampaigns from '../../../hooks/useCampaigns';

const AllCampaigns = () => {
    const [campaigns, , refetch] = useCampaigns();
    const axiosSecure = useAxiosSecure();

    const handleDeleteCampaign = (campaign) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/campaigns/${campaign._id}`);
                  
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${campaign.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }
            });
        }

    return (
        <div>
            <Helmet>
                <title>All Donation Campaigns </title>
            </Helmet>

            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>All Donation Campaigns</h3>
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
                            <th>Photo</th>
                            <th>Last Date</th>
                            <th>Paused Status</th>
                            <th>Action</th>
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
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={campaign.image}
                                                        alt="campaign image" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {campaign.last_date}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">{campaign.paused_status}</button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateCampaign/${campaign._id}`}><button className="btn btn-ghost"><FaEdit className="text-orange-600"></FaEdit></button></Link>
                                        <button onClick={() => handleDeleteCampaign(campaign)} className="btn btn-ghost"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCampaigns;