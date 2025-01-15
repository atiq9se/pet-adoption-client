import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div>

            <footer className="footer bg-neutral text-neutral-content p-10">
                <aside>

                    <p>
                        Pet adaption.
                        <br />
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