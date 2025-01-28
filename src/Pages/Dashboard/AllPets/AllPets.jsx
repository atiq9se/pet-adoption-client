import React from 'react';
import usePets from '../../../hooks/usePets';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';



const AllPets = () => {
    const [pets, , refetch] = usePets();
    const axiosSecure = useAxiosSecure();

    const handleDeletePet = (pet) => {
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
                const res = await axiosSecure.delete(`/pets/${pet._id}`);

                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${pet.name} has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                });
              
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>All Pet </title>
            </Helmet>
            
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>All Pets List</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Photo</th>
                            <th>Adoption</th>
                            <th>Action</th>
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
                                        <button className="btn btn-ghost btn-xs">{pet.adoption_status}</button>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updatePet/${pet._id}`}><button onClick={() => handleDeleteUpdate(pet)} className="btn btn-ghost"><FaEdit className="text-orange-600"></FaEdit></button></Link>
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

export default AllPets;