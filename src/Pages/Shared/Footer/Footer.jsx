import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from '../../../../src/assets/logo.png'

const Footer = () => {
    return (
        <div>

            <footer className="footer bg-neutral text-neutral-content p-10">
                <aside>
                    <img src={logo} alt="" className="w-72" />
                    <p className="md:text-xl text-lg">
                        Mohammadpur, Dhaka.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                          <FaTwitter />
                        </a>
                        <a>
                        <FaYoutube />
                        </a>
                        <a>
                        <FaFacebookF />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;