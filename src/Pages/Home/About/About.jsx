import React from 'react';
import aboutImg from '../../../assets/about.webp'

const About = () => {
    return (
        <div className="lg:px-24 md:px-12 px-6 py-12 mt-8">
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <div>
                    <img src={aboutImg} alt="" />
                </div>
                <div>
                    <h3 className='lg:text-4xl text-xl text-center font-bold mb-4'
                    >About us</h3>
                    <p className='text-xl text-justify'>Wherever you are in your pet parenting journey: from choosing and finding a pet to already loving & caring for pets, all the way through to saying goodbye… PetPlace is here to support you every step of the way.

We know how happy, healthy, and busy your pets keep you, so with all the resources, videos, articles, services, products, advice, opinions, and ideas out there, we thought you could use a good place to start.

You’ll find sound advice, trusted providers, and indispensable services here, all in one place.

Because every pet deserves to be well cared for, by companions who return their love and dedication.</p>
                </div>

            </div>

        </div>
    );
};

export default About;