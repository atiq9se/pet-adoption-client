import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCampaigns = () => {
    const axiosPublic = useAxiosPublic();

    const {data: campaigns = [], isPending: loading, refetch}= useQuery({
        queryKey: ['campaigns'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/campaigns');
            return res.data;
        }
    })
      
       return [campaigns, loading, refetch]
};

export default useCampaigns;