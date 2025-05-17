import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PropertiesIndex from './properties/PropertiesIndex';
import SearchServicePage from './services/SearchServicePage';
import ServicesIndex from './services/ServicesIndex';

import Dasboard from './dashbaord/Dasboard';

import Agent from './dashbaord/Agent/Agent';
import AddAgent from './dashbaord/Agent/AddAgent';

import RegisterForm from './auth/RegisterForm';
import LoginForm from './auth/LoginForm';

import SortByCategory from './services/SearchByCategory';
import AllServicesPage from './services/AllServicesPage';
import ServiceDetails from './services/DetailServicePage';

import PropertySearchPage from './properties/Pages/PropertySearchPage';
import PropertyDetails from './properties/Pages/PropertyDetails';
import Auction from './properties/Auction';
import PropertyCategoryPage from './properties/Pages/PropertyCategoryPage';
import DetailServicePage from './services/DetailServicePage';

import PropertyPage from './properties/PropertyPage';
import PropertiesPage from './properties/PropertiesPage';
import Properties from './dashbaord/properties/Properties';
import AddProperty from './dashbaord/properties/AddProperty';
import Profile from './dashbaord/account/profile';
import ChangePassword from './dashbaord/account/change-password';
import EditProperty from './dashbaord/properties/EditProperty';
import Tour from './dashbaord/tour';
import Bookings from './dashbaord/bookings/bookings';
import ManageBusiness from './dashbaord/businesss/manage';
import Orders from './dashbaord/orders';
import Earnings from './dashbaord/earnings';
import ListOfServices from './dashbaord/services';
import IdCard from './dashbaord/id';

import Bank from './dashbaord/bank';
import CreateBank from './dashbaord/bank/create';
import EditAgent from './dashbaord/Agent/EditAgent';
import EditBank from './dashbaord/bank/edit';
import CreateServices from './dashbaord/services/addService';
import EditService from './dashbaord/services/editService';
import BusinessOrders from './dashbaord/businesss/orders';
import ForgotPassword from './auth/ForgotPassword';
import ServiceProviderListing from './services/ServiceProviderListing';
import PropertyListing from './properties/PropertyListing';

import Wishlists from './dashbaord/wishlists';
import { useEffect, useState } from "react";
import TypeOfProperties from "./properties/PropertyType";
import MySpaces from "./dashbaord/bookings/myspaces";
import PropertiesByType from "./dashbaord/properties/PropertiesState";
import BookedHomes from "./dashbaord/bookings/bookedhomes";
import Onboarding from "./dashbaord/onboarding";
import { fetchOnboarding } from "../../utils/onboardingQueries";
import Navbar from "../layouts/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "../layouts/Footer";
import backgroundImage from '../../../src/assets/images/logback.png';
import Spinner from "../Spinner";
import VerifyOtp from "./dashbaord/otp";
import SearchProperties from "../cards/properties/searchProperties";
import EventSpace from "./eventspace";
import EventListing from "./eventspace/listing";
import About from "./About/About";
import Contact from "./About/Contact";

export default function DashboardRoute() {
    const auth = useSelector((state) => state.auth);
	const location = useLocation(); // useLocation hook to get the current path
	const key = location.pathname.split('/')[1];
	let image = "";
	const [results] = useState(null);

	if(auth.user === null) {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}

	let className = "pt-20";
	if(key === "dashboard") {
		if (!auth.token || auth.user === null) {
			return <Navigate to="/login" replace />;
		}
	}

	if(key === "login" || key === "register" || key === "forgot-password" || key === "onboarding" || key === "otp" || (results?.onboardingStep != 4 && key === "dashboard")) {
		if(key === "login" || key === "register" || key === "otp" || key === "forgot-password" || key === "onboarding")
		{
			image = backgroundImage;
			className = "h-screen bg-cover bg-no-repeat bg-center bg-full"
		}
	}

    return(
        <>
			<div style={{ fontFamily: "'Josefin Sans'" }}>
				{
					(key === "register" || key === "login" || key === "forgot-password" || key === "otp" || key === "onboarding" || results?.onboardingStep < 4) ? (
						""
					)  : (
						<Navbar />
					)
				}

				<main className={className} style={{ backgroundImage: `url(${image})` }}>
					<Routes>
						<Route path='/login' element={<LoginForm />} />
						<Route path='/register' element={<RegisterForm />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact-us' element={<Contact />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/properties/:id' element={<PropertyPage />} />
						<Route path='/properties/:id/all' element={<PropertiesPage />} />
						<Route path='/properties/:id/type' element={<TypeOfProperties />} />
						<Route path='/properties/:id/profile' element={<PropertyListing />} />
						<Route path='/properties/events' element={<EventSpace />} />
						<Route path='/properties/events/:id' element={<EventListing />} />
						<Route path='/properties/auction' element={<Auction />} />
						<Route path='/properties/category/:id' element={<PropertyCategoryPage />} />
						<Route path='/' element={<PropertiesIndex />} />
						<Route path='/properties/search-results' element={<PropertySearchPage />} />
						<Route path='/search-results' element={<SearchProperties />} />
						<Route path='/services' element={<ServicesIndex />} />
						<Route path='/services/:id' element={<ServiceProviderListing />} />
						<Route path='/services/categories' element={<SortByCategory />} />
						<Route path='/services/services/search-results' element={<SearchServicePage />}/>
						<Route path='/services/all-services' element={<AllServicesPage />} />
						<Route path='/services/detail-service/:id' element={<ServiceDetails />} />
						<Route path='/properties/detail-property/:id' element={<PropertyDetails />} />
						{
							(!auth.token || auth.user === null) ? (
								<Route path='/login' element={<LoginForm />} />
							) : (
								<>
									<Route path="/onboarding" element={<Onboarding />} />
									<Route path="/otp" element={<VerifyOtp />} />
									<Route path="/dashboard">
										<>
											<Route path='/dashboard' element={<Dasboard />} />
											<Route path='/dashboard/agent' element={<Agent />} />
											<Route path='/dashboard/agent/add' element={<AddAgent />} />
											<Route path='/dashboard/agent/:externalId' element={<EditAgent />} />
											<Route path='/dashboard/properties' element={<Properties />} />
											<Route path='/dashboard/properties/pending' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/approved' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/unapproved' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/rejected' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/sold' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/rented' element={<PropertiesByType />} />
											<Route path='/dashboard/properties/auctioned' element={<PropertiesByType />} />
											<Route path='/dashboard/business' element={<ManageBusiness />} />
											<Route path='/dashboard/business/earnings' element={<Earnings />} />
											<Route path='/dashboard/business/orders' element={<BusinessOrders />}/>
											<Route path='/dashboard/services' element={<ListOfServices />} />
											<Route path='/dashboard/services/add' element={<CreateServices />} />
											<Route path='/dashboard/services/:externalId' element={<EditService />} />
											<Route path='/dashboard/orders' element={<Orders />} />
											<Route path='/dashboard/properties/tour' element={<Tour />} />
											<Route path='/dashboard/bookings' element={<Bookings />} />
											<Route path='/dashboard/bookings/:state' element={<BookedHomes />} />
											<Route path='/dashboard/myspaces' element={<MySpaces />} />
											<Route path='/dashboard/properties/add' element={<AddProperty />} />
											<Route path='/dashboard/properties/add/:externalId' element={<AddProperty />} />
											<Route path='/dashboard/properties/add/:externalId/:step' element={<AddProperty />} />
											<Route path='/dashboard/properties/:externalId' element={<EditProperty />} />
											<Route path='/dashboard/properties/:externalId/:step' element={<EditProperty />} />
											<Route path='/dashboard/profile' element={<Profile />} />
											<Route path='/dashboard/change-password' element={<ChangePassword />} />
											<Route path='/dashboard/id-card' element={<IdCard />} />
											<Route path='/dashboard/bank' element={<Bank />} />
											<Route path='/dashboard/bank/create' element={<CreateBank />} />
											<Route path='/dashboard/bank/:externalId' element={<EditBank />} />
											<Route path='/dashboard/wishlists' element={<Wishlists />} />
										</>
									</Route>
								</>
							)
						}
					</Routes>
				</main>
			</div>
			<ToastContainer />
			{
				(key === "register" || key === "login" || key === "forgot-password" || key === "onboarding") ? (
					""
				)  : (
					<Footer />
				)
			}
        </>
    )
}