import React from 'react';
import { Helmet } from 'react-helmet-async';
import usePets from '../../hooks/usePets';

const PetListing = () => {
    const [pets, , refetch] = usePets();

    return (
        <div>
            <Helmet>
                <title>Pet Listing</title>
            </Helmet>
            <h2>Pet listing</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {
                    pets.map(pet =>
                        <div className="card bg-base-100  shadow-xl">
                            <figure>
                                <img
                                    src={pet.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{pet.name}</h2>
                                <p>Age: {pet.age}</p>
                                <p>Location: {pet.location}</p>
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

export default PetListing;