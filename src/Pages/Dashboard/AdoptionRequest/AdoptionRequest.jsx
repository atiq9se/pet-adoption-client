import { Helmet } from "react-helmet-async";

const AdoptionRequest = () => {
    return (
        <div>
            <Helmet>
                <title>My Adoption Request</title>
            </Helmet>
            <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>My Adoption Request</h3>
        </div>
    );
};

export default AdoptionRequest;