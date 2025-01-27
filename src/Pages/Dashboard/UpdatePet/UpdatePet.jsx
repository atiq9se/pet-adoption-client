import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const UpdatePet = () => {
    const { name, category, short_description, long_description, age, image, location, adoption_status, _id } = useLoaderData();
    const petItem = useLoaderData();
    console.log(petItem);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const petItem = {
                name: data.name,
                age: parseFloat(data.age),
                category: data.category,
                image: res.data.data.display_url,
                adoption_status: data.adoption_status,
                location: data.location,
                short_description: data.short_description,
                long_description: data.long_description,
                user_name: data.user_name,
                user_email: data.user_email

            }
            const petsRes = await axiosSecure.patch(`/pets/${_id}`, petItem);
            console.log(petsRes.data)
            if (petsRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is update to the pets`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
        // const service_photo = data.service_photo;
        // const service_name = data.service_name;
        // const price = data.price;
        // const service_area = data.service_area;
        // const description = data.description;
        // const provider_name = user.displayName;
        // const provider_email = user.email;
        // const provider_image = user.photoURL;
        // const newService = { service_photo, service_name, price, service_area, description, provider_name, provider_email, provider_image }

        // fetch('https:/services', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newService)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         Swal.fire({
        //             title: "Service adding Successfully",
        //             icon: "success"
        //         });

        //     })
        // navigate('/pet')

    }

    return (
        <div>
            <Helmet>
                <title>Update Pet </title>
            </Helmet>
            <div className="hero px-5">
                <div className="card w-full shadow-2xl my-8 z-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className="text-center text-cyan-600 font-bold md:text-3xl text-xl mb-4">Update Pet</h3>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Image of the Pet</span>
                                </label>
                                <input type="file" {...register("image")} placeholder="Pet Image URL" className="input input-bordered text-blue-800" />
                                
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
                                    <span className="label-text text-cyan-500">Adoption Status</span>
                                </label>
                                <select defaultValue={adoption_status} {...register('adoption_status')} className="select select-bordered w-full max-w-xs">
                                    <option selected value="false">false</option>
                                    <option value="">true</option>
                                </select>
                            </div>
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

                        </div>
                        <div className="mt-5 text-center">
                            <input className="btn bg-red-400 border-none text-white px-20 text-center hover:bg-cyan-600" type="submit" value="Update Pet" />
                        </div>
                    </form>
                </div >
            </div>

        </div>
    );
};

export default UpdatePet;