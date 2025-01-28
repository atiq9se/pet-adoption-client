import { Helmet } from "react-helmet-async";
import useCampaigns from "../../hooks/useCampaigns";
import { Link } from "react-router-dom";


const DonationCampaigns = () => {
  const [campaigns, , refetch] = useCampaigns();

  return (
    <div>
      <Helmet>
        <title>Donation Campaigns</title>
      </Helmet>
      <h3 className='lg:text-4xl text-xl text-center font-bold py-8'>Donation Campaigns</h3>
      <div className='lg:px-24 md:px-12 px-6 py-12'>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {
            campaigns.map(campaign =>
              <div className="card bg-base-100  shadow-xl">
                <figure>
                  <img
                    src={campaign.image}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{campaign.name}</h2>
                  <p>Maximum Amount: {campaign.donation_amount}</p>
                  <div className="card-actions justify-end">
                     <Link to={`/campaignDetails/${campaign._id}`} className="btn bg-teal-400 text-xl">Details</Link>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DonationCampaigns;