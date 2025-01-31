import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PetDetails = () => {
    const { name, category, short_description, long_description, age, image, location, adoption_status, _id, user_name, user_email } = useLoaderData();
    console.log(name, image)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
            const adoptionItem = {
                name: data.name,
                age: parseFloat(data.age),
                category: data.category,
                image: data.image,
                location: data.location,
                short_description: data.short_description,
                long_description: data.long_description,
                user_email: data.user_email,
                requestor_name: data.requestor_name,
                requestor_email: data.requestor_email,
                requestor_phone: data.requestor_phone,
                requestor_address: data.requestor_address,
                timestamp: Date.now()

            }
            const adoptionRes = await axiosSecure.post('/adoptions', adoptionItem);
            console.log(adoptionRes.data)
            if (adoptionRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the adoptions`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
       // }
    }

    return (
        <div>
            <Helmet>
                <title>Pet Details</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>Pet Details</h3>
            <div className='lg:px-24 md:px-12 px-6 py-12 flex justify-center'>
                <div className="card md:w-1/2 w-full bg-base-100  shadow-xl">
                    <figure>
                        <img
                            src={image}
                            alt="pet img" className="w-full" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{name || <Skeleton count={3} />}</h2>
                        <p>Age: {age || <Skeleton />}</p>
                        <p>Location: {location || <Skeleton count={3} />}</p>
                        <p>Category: {category || <Skeleton count={3} />}</p>
                        <p>Short Description: {short_description || <Skeleton count={3} />} </p>
                        <p>Long Description: {long_description || <Skeleton count={3} />} </p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn bg-teal-400 text-xl" onClick={() => document.getElementById('my_modal_5').showModal()}>Adopt Button</button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle w-full">
                <div className="modal-box w-2/3">
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <form method="dialog" onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h3 className="text-center text-cyan-600 font-bold md:text-3xl text-xl mb-4">{name}</h3>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Image of the Pet</span>
                                    </label>
                                    <input type="text" defaultValue={image} {...register("image")} placeholder="Pet Image URL" className="input input-bordered text-blue-800" />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Pet Name</span>
                                    </label>
                                    <input type="text" defaultValue={name} {...register('name', { required: true })} placeholder="Pet Name" className="input input-bordered text-blue-800" required />
                                    {errors.name?.type === 'required' && <p className="text-red-600">Pet name is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Pet Age</span>
                                    </label>
                                    <input type="text" defaultValue={age} {...register('age', { required: true })} placeholder="Age" className="input input-bordered text-blue-800" required />
                                    {errors.age?.type === 'required' && <p className="text-red-600">Pet age is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Pet Category</span>
                                    </label>
                                    <select defaultValue={category} {...register('category')} className='select select-bordered w-full'>
                                        <option disabled>Select a category</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="fish">Fish</option>
                                        <option value="rabbit">Rabbit</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Location</span>
                                    </label>
                                    <input type="text" defaultValue={location} {...register('location', { required: true })} placeholder="Location Area" className="input input-bordered text-blue-800" required />
                                    {errors.location?.type === 'required' && <p className="text-red-600">Location area is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Short Description</span>
                                    </label>
                                    <input type="text" defaultValue={short_description} {...register('short_description', { required: true })} placeholder="Service Area" className="input input-bordered text-blue-800" required />
                                    {errors.short_description?.type === 'required' && <p className="text-red-600">Service area is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Long Description</span>
                                    </label>
                                    <textarea defaultValue={long_description} {...register('long_description', { required: true })} className="textarea textarea-bordered text-blue-800" placeholder="Description" required></textarea>
                                    {errors.long_description?.type === 'required' && <p className="text-red-600">Long Description is required</p>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">User Email</span>
                                    </label>
                                    <input type="text" {...register('user_email', { required: true })} name="user_email" value={user_email} placeholder="Service Email" className="input input-bordered text-blue-800" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Current User Email</span>
                                    </label>
                                    <input type="text" {...register('requestor_email', { required: true })} name="requestor_email" value={user.email} placeholder="Service Email" className="input input-bordered text-blue-800" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Current User Name</span>
                                    </label>
                                    <input type="text" {...register('requestor_name', { required: true })} name="requestor_name" value={user.displayName}  className="input input-bordered text-blue-800" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Phone Number</span>
                                    </label>
                                    <input type="text" {...register('requestor_phone', { required: true })} name="requestor_phone"  placeholder="Phone Number" className="input input-bordered text-blue-800" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Address</span>
                                    </label>
                                    <input type="text" {...register('requestor_address', { required: true })} name="requestor_address"  placeholder="Address" className="input input-bordered text-blue-800" required />
                                </div>

                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn bg-red-400 border-none text-white px-20 text-center hover:bg-cyan-600" >Adoption</button>
                            </div>
                        </form>
                        {/* <button className="btn">Close</button> */}

                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PetDetails;