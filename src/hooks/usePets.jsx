import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const usePets = () =>{
    const axiosPublic = useAxiosPublic();
//    const [pets, setPets] =useState([]);
//    const [loading, setLoading] = useState(true);

//    useEffect(()=>{
//      fetch('http://localhost:5000/pets')
//         .then(res=>res.json())
//         .then(data=>{
//             setPets(data)
//             setLoading(false)
//         });
//    }, [])
   
const {data: pets = [], isPending: loading, refetch}= useQuery({
    queryKey: ['pets'],
    queryFn: async ()=>{
        const res = await axiosPublic.get('/pets');
        return res.data;
    }
})
  
   return [pets, loading, refetch]
}
export default usePets;