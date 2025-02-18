import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCampaign = () => {
    const { name, donation_amount, short_description, long_description, image, last_date, paused_status, _id } = useLoaderData();
    const campaignItem = useLoaderData();
    console.log(campaignItem);
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
            const campaignItem = {
                name: data.name,
                donation_amount: parseFloat(data.donation_amount),
                image: res.data.data.display_url,
                paused_status: data.paused_status,
                last_date: data.last_date,
                short_description: data.short_description,
                long_description: data.long_description,
                user_name: data.user_name,
                user_email: data.user_email

            }
            const campaignsRes = await axiosSecure.patch(`/campaigns/${_id}`, campaignItem);
            console.log(campaignsRes.data)
            if (campaignsRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is update to the campaign`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data)
    }

    return (
        <div>
            <Helmet>
                <title>Update Donation Campaign </title>
            </Helmet>
            <div className="hero px-5">
                <div className="card w-full shadow-2xl my-8 z-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className="text-center text-cyan-600 font-bold md:text-3xl text-xl mb-4">Update Campaign</h3>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Image of the Pet</span>
                                </label>
                                <input type="file" {...register("image", { required: true})} placeholder="Pet Image URL" className="input input-bordered text-blue-800" />
                                {errors.image?.type === 'required' && <p className="text-red-600">Pet photo is required</p>}

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
                                    <span className="label-text text-cyan-500">Maximum Donation Amount</span>
                                </label>
                                <input type="text"  defaultValue={donation_amount} {...register('donation_amount', { required: true })} placeholder="Maximum Donation Amount" className="input input-bordered text-blue-800" required />
                                {errors.donation_amount?.type === 'required' && <p className="text-red-600">Maximum Donation Amount is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500"> Last date of donation</span>
                                </label>
                                <input type="date"  defaultValue={last_date} {...register('last_date', { required: true })} name="last_date" placeholder=" Last date of donation" className="input input-bordered text-blue-800" required />
                                {errors.last_date?.type === 'required' && <p className="text-red-600"> Last date of donation is required</p>}
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
                                    <span className="label-text text-cyan-500">Paused Status</span>
                                </label>
                                <select defaultValue={paused_status} {...register('paused_status')} className="select select-bordered w-full max-w-xs">
                                    <option selected value="unpaused">Unpaused donation campaign</option>
                                    <option value="paused">Paused donation campaign</option>
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
                            <input className="btn bg-red-400 border-none text-white px-20 text-center hover:bg-cyan-600" type="submit" value="Update Campaign" />
                        </div>
                    </form>
                </div >
            </div>

        </div>
    );
};

export default UpdateCampaign;