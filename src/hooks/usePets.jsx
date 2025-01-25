import { useEffect, useState } from "react";

const usePets = () =>{
   const [pets, setPets] =useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
     fetch('http://localhost:5000/pets')
        .then(res=>res.json())
        .then(data=>{
            setPets(data)
            setLoading(false)
        });
   }, [])
   return [pets, loading]
}
export default usePets;