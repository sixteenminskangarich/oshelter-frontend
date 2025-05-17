/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

import logo from '../../assets/images/footerlogo.png';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import linkedin from '../../assets/images/linkedin.png';
import twitter from '../../assets/images/twitter.png';
import youtube from '../../assets/images/youtube.png';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation(); // useLocation hook to get the current path
	const key = location.pathname.split('/')[1];
    if(key === "dashboard") {
        return null
    }
	const yearDate = new Date().getFullYear();
	return (
		<>
			{/* <footer className='bg-[#F6F6F6] text-[#000] from-gray-100 via-[#bce1ff] to-gray-100 font-medium py-8 mt-4'>
				<div className='max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
						<div className='flex flex-col items-center lg:items-start font-josefin-sans'>
							<div className='flex items-center mb-4'>
								<img
									src={logo}
									width={80}
									height={80}
									className=''
									alt='Oshelter Logo'
								/>
								<h1 className='text-bg-color font-roboto font-bold ml-4'>
									Oshelter
								</h1>
							</div>

							<h1 className='font-medium'>Location</h1>
							<p className='max-w-xs mt-4 text-sm text-gray-600 text-center lg:text-left'>
								Joy Lane, Behind Ghana Int. Trade Fair, Tse-Addo- Accra,
								GL-050-6970 (+233) 030-279-5111
							</p>

							<div className='flex mt-4 space-x-6 text-gray-600'>
								<Link className='hover:opacity-75' to='/'>
									<FaFacebook className='text-2xl text-[#007BFF]' />
								</Link>
								<Link className='hover:opacity-75' to='/'>
									<FaInstagramSquare className='text-2xl text-[#FD3C97]' />
								</Link>
								<Link className='hover:opacity-75' to='/'>
									<FaTwitterSquare className='text-2xl text-[#007BFF]' />
								</Link>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3 font-josefin-sans '>
							<div>
								<p className='font-bold'>About OShelter</p>
								<nav className='flex flex-col mt-4 space-y-2 text-sm text-[#6D6D6D] text-text-footer'>
									<Link className='hover:opacity-75' to='/'>
										Oshelter
									</Link>
									<Link className='hover:opacity-75' to='/'>
										About Us
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Contact Us
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Privacy Policy
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Data Protection
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Listing Policy
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Rent Policy
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Sale Policy
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Refund Policy
									</Link>
								</nav>
							</div>

							<div>
								<p className='font-bold'>For Property Seekers</p>
								<nav className='flex flex-col mt-4 space-y-2 text-sm text-gray-500 text-sm text-[#6D6D6D] text-text-footer'>
									<Link to='/properties/sale' className='hover:opacity-75'>
										Buy Property
									</Link>
									<Link to='/properties/rent' className='hover:opacity-75'>
										Rent Property
									</Link>
									<Link to='/properties/sale' className='hover:opacity-75'>
										Sale Property
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Auction
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Buy Land
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Sell Land
									</Link>
								</nav>
							</div>

							<div>
								<p className='font-bold'>For Property Owners</p>
								<nav className='flex flex-col mt-4 space-y-2 text-sm text-gray-500 text-sm text-[#6D6D6D] text-text-footer'>
									<Link className='hover:opacity-75' to='/'>
										Contact
									</Link>
									<Link className='hover:opacity-75' to='/'>
										FAQs
									</Link>
									<Link className='hover:opacity-75' to='/'>
										Live Chat
									</Link>
								</nav>
							</div>
						</div>
					</div>

					<p className='mt-8 text-center text-xs text-gray-800'>
						© {yearDate} Oshelter
					</p>
				</div>
			</footer> */}
            <div className="flex flex-col flex-1 z-30">
                <footer className="w-full mobile-footer" style={{ fontFamily: '"Josefin Sans",sans-serif' }}>
                    <div className="bg-oshelter-deep-blue" style={{ backgroundColor: '#281d52', paddingBottom: '55px' }}>
                        <div className="grid gap-4 xl:grid-cols-6 md:grid-cols-6 container flex justify-between px-6 mx-auto relative top-8">
                            <div className="col-span-2 mb-10">
                                <div className="heading-container mb-6">
                                    <h4 className="font-semibold text-lg text-white">Location</h4> 
                                    <hr style={{ backgroundColor: '#7d8eed', border: 'none', height: '2px', margin: '0', width: '35px' }}/>
                                </div>
                                <p className="text-white text-sm">Joy Lane, Behind Ghana Int. Trade Fair<br />
                                    Tse-Addo- Accra, GL-050-6970<br /> (+233) 20-374-8609
                                </p>
                                <div className="flex justify-start my-4">
                                    <div className="mr-4">
                                        <a href="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                                            <img src={ facebook } width="28" height="28" alt="Facebook" />
                                        </a>
                                    </div>
                                    <div className="mx-4">
                                        <a href="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                                            <img src={ twitter } width="28" height="28" alt="Twitter" />
                                        </a>
                                    </div>
                                    <div className="mx-4">
                                        <a href="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                                            <img src={linkedin} width="28" height="28" alt="LinkedIn" />
                                        </a>
                                    </div>
                                    <div className="mx-4">
                                        <a href="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                                            <img src={ instagram } width="28" height="28" alt="Instagram" />
                                        </a>
                                    </div>
                                    <div className="mx-4">
                                        <a href="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                                            <img src={ youtube } width="28" height="28" alt="Youtube" />
                                        </a>
                                    </div>
                                </div>
                                <p className="text-white text-sm">
                                    <a href="/terms-and-conditions" className="">Terms &amp; Conditions</a> 
                                    <br />
                                    <span className="text-pink">©</span> 
                                    <span className="text-xs">OShelter { yearDate }. All Right Reserved</span>
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="heading-container mb-4">
                                    <h4 className="font-semibold text-lg text-white">Oshelter</h4> 
                                    <hr style={{ backgroundColor: '#7d8eed', border: 'none', height: '2px', margin: '0', width: '35px' }}/>
                                </div>
                                <Link to="/about" aria-current="page" className="text-sm text-white mt-1 mb-1 nuxt-link-exact-active nuxt-link-active">
                                    OShelter
                                </Link>
                                <a href="/about-us" className="text-sm text-white mt-1 mb-1">
                                    About Us
                                </a>
                                <Link to="/contact-us" className="text-sm text-white mt-1 mb-1">
                                    Contact Us
                                </Link>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Advertisement
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Subscription
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    FAQ
                                </a>
                            </div>
                            <div className="flex flex-col">
                                <div className="heading-container mb-4">
                                    <h4 className="font-semibold text-lg text-white">Services</h4>
                                    <hr style={{ backgroundColor: '#7d8eed', border: 'none', height: '2px', margin: '0', width: '35px' }}/>
                                </div>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Advertise with Us
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Logistics
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Plumbing and Carpentry
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Property Shoots
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Decor
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Land Survey
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Property Evaluation
                                </a>
                            </div>
                            <div className="flex flex-col">
                                <div className="heading-container mb-4">
                                    <h4 className="font-semibold text-lg text-white">For Rent</h4>
                                    <hr style={{ backgroundColor: '#7d8eed', border: 'none', height: '2px', margin: '0', width: '35px' }}/>
                                </div>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Room for rent
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    House for rent
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Apartment for rent
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Office Space for rent
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Hostel for rent
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Short stays
                                </a>
                            </div>
                            <div className="flex flex-col">
                                <div className="heading-container mb-4">
                                    <h4 className="font-semibold text-lg text-white">For Sale</h4> 
                                    <hr style={{ backgroundColor: '#7d8eed', border: 'none', height: '2px', margin: '0', width: '35px' }}/>
                                </div>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    House for sale
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Apartment for sale
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Land for sale
                                </a>
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Office for sale
                                </a> 
                                <a href="/#" className="text-sm text-white mt-1 mb-1">
                                    Off the Plan
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 mb-4 ml-5 flex justify-center items-center text-md">
                        <Link href="/policies/listing-policy" className="text-md footer-nav-padding xl:mr-10 lg:mr-10">Listing Policy</Link> 
                        <a href="/policies/sales-policy" className="text-md footer-nav-padding xl:mr-10 lg:mr-10">Sales Policy</a> 
                        <a href="/policies/rent-policy" className="text-md footer-nav-padding xl:mr-10 lg:mr-10">Rent Policy</a> 
                        <a href="/policies/privacy-policy" className="text-md footer-nav-padding xl:mr-10 lg:mr-10">Privacy Policy</a> 
                        <a href="/policies/refund-policy" className="text-md footer-nav-padding xl:mr-10 lg:mr-10">Refund Policy</a>
                    </div>
                </footer>
            </div>
            
		</>
	);
};

export default Footer;
