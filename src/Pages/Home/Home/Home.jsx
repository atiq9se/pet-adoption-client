import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import About from '../About/About';
import CallToAction from '../CallToAction/CallToAction';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import TermOfUse from '../TermOfUse/TermOfUse';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home Pet-adoption</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <CallToAction></CallToAction>
            <About></About>
            <PrivacyPolicy></PrivacyPolicy>
            <TermOfUse></TermOfUse>
            
        </div>
    );
};

export default Home;