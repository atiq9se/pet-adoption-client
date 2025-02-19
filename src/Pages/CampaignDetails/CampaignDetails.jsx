import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

//add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CampaignDetails = () => {
    const { name, donation_amount, short_description, long_description, last_date, image, location, paused_status, _id } = useLoaderData();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();




    return (
        <div>
            <Helmet>
                <title>Campaign Details</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold pt-8'>Donation Campaign Details</h3>
            <div className='lg:px-24 md:px-12 px-6 py-12 flex justify-center'>
                <div className="card w-full bg-base-100 shadow-xl grid md:grid-cols-2 grid-cols-1 overflow-hidden">
                    <div>
                        <img
                            src={image}
                            alt="pet img" className="w-full" />
                    </div>
                    <div className="p-8">
                        <h2 className="md:text-3xl font-bold pb-4 text-lg">{name || <Skeleton count={3} />}</h2>
                        <p className="text-xl">Maximum Donation Amount: <span className="text-teal-500 font-bold md:text-2xl text-xl">{donation_amount || <Skeleton />} Tk</span></p>
                        <p className="pb-3"><span className="font-bold">Last Date:</span> {last_date || <Skeleton count={3} />}</p>
                        <p className="font-bold"> {short_description || <Skeleton count={3} />} </p>
                        <p className="pb-2"> {long_description || <Skeleton count={3} />} </p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn bg-teal-400 text-xl" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle w-full">
                <div className="modal-box w-2/3">
                    <div className="modal-action">
                        {/* <form method="dialog"> */}
                        <form method="dialog" className="card-body">
                            <h3 className="text-center text-cyan-600 font-bold md:text-3xl text-xl mb-4">{name}</h3>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Pet Name</span>
                                    </label>
                                    <input type="text" defaultValue={name} {...register('name', { required: true })} placeholder="Pet Name" className="input input-bordered text-blue-800" required />
                                    {errors.name?.type === 'required' && <p className="text-red-600">Pet name is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-cyan-500">Donation Amount</span>
                                    </label>
                                    <input type="text" {...register('donation_amount', { required: true })} placeholder="Donation Amount" className="input input-bordered text-blue-800" required />
                                    {errors.donation_amount?.type === 'required' && <p className="text-red-600">Donation Amount is required</p>}
                                </div>
                            </div>
                            <div className="form-control mt-5">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm></CheckoutForm>
                                </Elements>
                            </div>
                        </form>
                        {/* <button className="btn">Close</button> */}

                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CampaignDetails;