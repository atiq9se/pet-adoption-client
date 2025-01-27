import { Helmet } from "react-helmet-async";
import useCampaigns from "../../hooks/useCampaigns";


const DonationCampaigns = () => {
  const [campaigns, , refetch] = useCampaigns();

  return (
    <div>
      <Helmet>
        <title>Donation Campaigns</title>
      </Helmet>
      <h2>Donation Campaigns</h2>
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
                <p>Age: {campaign.donation_amount}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default DonationCampaigns;