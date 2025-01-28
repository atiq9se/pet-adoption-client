import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// define your extension array
const extensions = [StarterKit]



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const CreateDonationCampaign = () => {
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
            const campaignItem ={
                name:data.name,
                image: res.data.data.display_url,
                donation_amount: parseFloat(data.donation_amount),
                last_date: data.last_date,
                short_description: data.short_description,
                long_description: data.long_description,
                user_name: data.user_name,
                user_email: data.user_email,
                paused_status: data.paused_status,
                timestamp: Date.now()

            }
            const campaignsRes = await axiosSecure.post('/campaigns', campaignItem);
            console.log(campaignsRes.data)
            if(campaignsRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Create Donation Campaign is added successfully',
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
                <title>Create Donation Campaign</title>
            </Helmet>
            <div className="hero px-5">
                <div className="card w-full shadow-2xl my-8 z-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h3 className="text-center text-cyan-600 font-bold md:text-3xl text-xl mb-4">Create Donation Campaign</h3>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500">Pet Picture</span>
                                </label>
                                <input type="file" {...register("image",
                                    { required: true}
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
                                    <span className="label-text text-cyan-500">Maximum Donation Amount</span>
                                </label>
                                <input type="text" {...register('donation_amount', { required: true })} placeholder="Maximum Donation Amount" className="input input-bordered text-blue-800" required />
                                {errors.donation_amount?.type === 'required' && <p className="text-red-600">Maximum Donation Amount is required</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-cyan-500"> Last date of donation</span>
                                </label>
                                <input type="date" {...register('last_date', { required: true })} name="last_date" placeholder=" Last date of donation" className="input input-bordered text-blue-800" required />
                                {errors.last_date?.type === 'required' && <p className="text-red-600"> Last date of donation is required</p>}
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
                                <EditorProvider extensions={extensions}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    </EditorProvider>
                                <textarea {...register('long_description', { required: true })} className="textarea textarea-bordered text-blue-800" placeholder="Description" required></textarea>
                                {errors.long_description?.type === 'required' && <p className="text-red-600">Long Description is required</p>}
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
                            <select {...register('paused_status')} className="select select-bordered w-full max-w-xs hidden">
                                <option selected value="unpaused">Unpaused donation campaign</option>
                                <option value="paused">Paused donation campaign</option>
                            </select>
                        </div>
                        <div className="mt-5 text-center">
                            <input className="btn bg-red-400 border-none text-white px-20 text-center hover:bg-cyan-600" type="submit" value="Add Pet" />
                        </div>
                    </form>
                </div >
            </div >

        </div>
    );
};

export default CreateDonationCampaign;