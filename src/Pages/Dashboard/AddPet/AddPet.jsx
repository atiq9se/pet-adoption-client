
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async(data) => {
        console.log(data);
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            const petItem ={
                name:data.name,
                age: parseFloat(data.age),
                category: data.category,
                image: res.data.data.display_url,
                adoption_status: data.adoption_status,
                location: data.location,
                short_description: data.short_description,
                long_description: data.long_description,
                user_name: data.user_name,
                user_email: data.user_email,
                timestamp: Date.now()

            }
            const petsRes = await axiosSecure.post('/pets', petItem);
            console.log(petsRes.data)
            if(petsRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the pets`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Add Pet Pet-adoption</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>Add a Pet</h3>
            <div className="hero px-5">
                <div className="card w-full shadow-2xl my-8 z-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Image of the Pet</span>
                                </label>
                                <input type="file" {...register("image",
                                    {
                                        required: true
                                    }
                                )} placeholder="Pet Image URL" className="input input-bordered text-blue-800" />
                                {errors.image?.type === 'required' && <p className="text-red-600">Pet photo is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Pet Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} placeholder="Pet Name" className="input input-bordered text-blue-800" required />
                                {errors.name?.type === 'required' && <p className="text-red-600">Pet name is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Pet Age</span>
                                </label>
                                <input type="text" {...register('age', { required: true })} placeholder="Age" className="input input-bordered text-blue-800" required />
                                {errors.age?.type === 'required' && <p className="text-red-600">Pet age is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Pet Category</span>
                                </label>
                                <select defaultValue="default" {...register('category')} className='select select-bordered w-full'>
                                    <option disabled value="default">Select a category</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="horses">Horses</option>
                                    <option value="goats">Goats</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Location</span>
                                </label>
                                <input type="text" {...register('location', { required: true })} placeholder="Location Area" className="input input-bordered text-blue-800" required />
                                {errors.location?.type === 'required' && <p className="text-red-600">Location area is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Short Description</span>
                                </label>
                                <input type="text" {...register('short_description', { required: true })} placeholder="Short Description" className="input input-bordered text-blue-800" required />
                                {errors.short_description?.type === 'required' && <p className="text-red-600">Short Description is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Long Description</span>
                                </label>
                                <textarea {...register('long_description', { required: true })} className="textarea textarea-bordered text-blue-800" placeholder="Description" required></textarea>
                                {errors.long_description?.type === 'required' && <p className="text-red-600">Long Description is required</p>}
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500"> Date Time</span>
                                </label>
                                <input type="date" {...register('time', { required: true })} name="taking_date" placeholder="Service Taking Date" className="input input-bordered text-blue-800" required />
                                <input type="time" {...register('time', { required: true })} name="taking_date" placeholder="Service Taking Date" className="input input-bordered text-blue-800" required />
                                {errors.time?.type === 'required' && <p className="text-red-600">Time area is required</p>}
                            </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Current User Email</span>
                                </label>
                                <input type="text" {...register('user_email', { required: true })} name="user_email" value={user.email} placeholder="Service Email" className="input input-bordered text-blue-800" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Current User Name</span>
                                </label>
                                <input type="text" {...register('user_name', { required: true })} name="user_name" value={user.displayName} placeholder="Service Name" className="input input-bordered text-blue-800" required />
                            </div>
                            <select {...register('adoption_status')} className="select select-bordered w-full max-w-xs hidden">
                                <option selected value="false">Adoption false</option>
                                <option value="">True</option>
                            </select>
                        </div>
                        <div className="mt-5 text-center">
                            <input className="btn bg-red-400 border-none text-white px-20 text-center hover:bg-cyan-600" type="submit" value="Add Pet" />
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
};

export default AddPet;