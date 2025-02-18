import dog from '../../../assets/category/dog.jpg'
import cat from '../../../assets/category/cat.jpg'
import rabbit from '../../../assets/category/rabbit.jpg'
import horses from '../../../assets/category/horses.jpg'
import goats from '../../../assets/category/goats.jpg'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className="lg:px-24 md:px-12 px-6 py-12 mt-6">
            <h2 className='text-center md:text-3xl text-xl font-bold pb-8'>ALL PET ADOPTION CATEGORY</h2>
            <div className='grid md:grid-cols-5 grid-cols-1 gap-5'>
                <Link to='/petListing' className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={dog} alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Dog</h2>
                    </div>
                </Link>
                <Link to='/petListing' className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={cat} alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Cat</h2>
                    </div>
                </Link>
                <Link to='/petListing' className="card bg-base-100 shadow-xl">
                    <figure>
                    <img src={rabbit} alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Rabbit</h2>
                    </div>
                </Link>
                <Link to='/petListing' className="card bg-base-100 shadow-xl">
                    <figure>
                        <img src={horses} alt="" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Horses</h2>
                    </div>
                </Link>
                <Link to='/petListing' className="card bg-base-100 shadow-xl">
                    <figure>
                    <img src={goats} alt="" />
                    </figure>
                    
                    <div className="card-body">
                        <h2 className="card-title font-bold">Goats</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Category;