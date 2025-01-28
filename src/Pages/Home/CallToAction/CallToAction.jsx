import actionOne from '../../../assets/action/actionone.webp'
import actionTwo from '../../../assets/action/actiontwo.webp'
import actionThree from '../../../assets/action/actionthree.webp'

const CallToAction = () => {
    return (
        <div className="lg:px-24 md:px-12 px-6 py-12 mt-8">
                <h2 className='lg:text-4xl text-xl text-center font-bold mb-8 mt-8'>Call To Action</h2>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={actionOne} alt="" className='p-4' />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Choose a pet</h2>
                            <p>Planning for a new family member is exciting, but it requires a lot of research. Start your matchmaking adventure with our dog breed guide and cat breed guide, or use our search bar for information on reptiles, fish, birds, or any other small pets</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={actionTwo} alt="" className='p-4'/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Find a lost pet</h2>
                            <p>Pet tags improve the chances of reuniting parents with lost pets. Order yours now and read up on tips to keep your precious pets safe and close</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={actionThree} alt="" className='p-4' />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Bring your pet home</h2>
                            <p>Looking for some tips to make homecoming easier for everyone? Start here</p>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CallToAction;