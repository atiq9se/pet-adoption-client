import BannerImg from '../../../assets/login/banner.webp'

const Banner = () => {
    return (
        <div className=''>
            <img src={BannerImg} alt="" className='w-full' />
            <div className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-white bg-gray-400 bg-opacity-25 p-4'>
                 <h3 className='md:text-5xl text-xl text-center'>Find your new best friend</h3>
                 <h4 className='md:text-2xl text-lg pt-5 text-center'>Browse pets from our network of over 14,500 shelters and rescues.</h4>
            </div>
        </div>
    );
};

export default Banner;