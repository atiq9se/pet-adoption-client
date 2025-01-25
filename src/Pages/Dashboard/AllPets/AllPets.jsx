import React from 'react';
import usePets from '../../../hooks/usePets';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllPets = () => {
    const [pets] = usePets();


    const handleDeletePet = pet =>{
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
    
                    axiosSecure.delete(`/users/${user._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                  Swal.fire({
                                    title: "Deleted!",
                                    text: "Your user has been deleted.",
                                    icon: "success"
                                  });
                            }
                        })
                }
            });
        }

    return (
        <div>
            <h2>All Pets</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
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
                            pets.map((pet, index)=>
                        <tr key={pet._id}>
                            <td>
                                {index+1}
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
                                <button onClick={()=> handleDeleteUpdate(pet)} className="btn btn-ghost"><FaEdit className="text-orange-600"></FaEdit></button>
                                <button onClick={()=> handleDeletePet(pet)} className="btn btn-ghost"><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
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