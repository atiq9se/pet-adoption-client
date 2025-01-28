import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";
import { useLoaderData } from "react-router-dom";

const CampaignDetails = () => {
    const { name, donation_amount, short_description, long_description, last_date, image, location, paused_status, _id } = useLoaderData();
    return (
        <div>
            <Helmet>
                <title>Campaign Details</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>Donation Campaign Details</h3>
            <div className='lg:px-24 md:px-12 px-6 py-12 flex justify-center'>
                <div className="card md:w-1/2 w-full bg-base-100  shadow-xl">
                    <figure>
                        <img
                            src={image}
                            alt="pet img" className="w-full" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{name || <Skeleton count={3} />}</h2>
                        <p>Maximum Donation Amount: {donation_amount || <Skeleton />}</p>
                        <p>Last Date: {last_date || <Skeleton count={3} />}</p>
                        <p>Short Description: {short_description || <Skeleton count={3} />} </p>
                        <p>Long Description: {long_description || <Skeleton count={3} />} </p>
                        <div className="card-actions justify-center mt-4">
                            <button className="btn bg-teal-400 text-xl">Donate Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;