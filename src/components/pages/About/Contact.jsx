import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoMailUnreadOutline } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";
import { PiChatsCircle } from "react-icons/pi";
import { SlSocialInstagram } from "react-icons/sl";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <div>
            <section className="py-24 ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="font-josefin text-5xl text-center font-bold text-bg-color mb-6">Contact Us</h2>
                        <p className="text-lg text-gray-500 text-center">Lorem ipsum dolorsitamet,consecteturadipiscingelit, <br />seddoeiusmodtemporincididunt
                        ut labore et dolore magna aliqua.Quis ipsum suspendisse ultrices gravida.Risus</p>
                    </div>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 gap-4 text-white justify-center font-medium gap-y-14 max-w-3xl mx-auto lg:max-w-full" style={{ fontFamily: 'Josefin Sans'}}>
                        <div className="bg-bg-color p-5 rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center">
                                <div className="row">
                                    <h3 className="text-3xl mb-4 flex justify-center items-center">Customer Case</h3>
                                    <p className="text-white flex text-xl"><MdPhoneInTalk className="mr-2 h-8 w-8" />(+233)20-374-8609</p>
                                    <p className="text-white flex mt-3"><IoMailUnreadOutline className="mr-2 h-8 w-8" /><span className="text-xl mb-2">email:info@oshelter.com</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-color p-6 rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center">
                                <div className="row">
                                    <h3 className="text-3xl mb-4 flex justify-center items-center">Follow Us</h3>
                                    <div className="flex">
                                        <Link to="/" className="mr-10"><FaFacebook className="h-8 w-8" /></Link>
                                        <Link to="/" className="mr-10"><BsTwitterX className="h-8 w-8"/></Link>
                                        <Link to="/" className="mr-10"><FaLinkedin className="h-8 w-8"/></Link>
                                        <Link to="/" className="mr-10"><SlSocialInstagram className="h-8 w-8"/></Link>
                                        <Link to="/"><FaYoutube className="h-8 w-8"/></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-color p-6 rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center">
                                <div className="row mb-4">
                                    <h3 className="text-3xl mb-4 flex justify-center items-center">Location</h3>
                                    <p className="text-white flex text-xl"><IoLocationSharp className="mr-2 h-12 w-12 mt-[2px]" />JoyLane, Behind Ghana Int. Trade Fair<br />
                                    Tse-Addo-Accra, GL-050-6970</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-bg-color p-6 rounded-lg shadow-md w-full">
                            <div className="flex justify-center items-center">
                                <div className="row">
                                    <h3 className="text-xl font-bold mb-4"><PiChatsCircle className="h-16 w-16"/></h3>
                                    <button className="bg-white text-bg-color relative right-4 py-1 px-4 rounded-lg shadow-md hover:bg-gray-200">
                                        Live Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
        </div>
    );
};

export default Contact;