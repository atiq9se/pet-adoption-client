import { Helmet } from "react-helmet-async";


const MyDonation = () => {
    return (
        <div>
            <Helmet>
                <title>My Donation</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>My Donation</h3>
            
        </div>
    );
};

export default MyDonation;