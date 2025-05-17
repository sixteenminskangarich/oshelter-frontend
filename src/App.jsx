/* eslint-disable no-unused-vars */
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Navbar from './components/layouts/Navbar';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Footer from './components/layouts/Footer';
import backgroundImage from '../src/assets/images/logback.png';
import { useEffect } from 'react';
import DashboardRoute from './components/pages/routes';
import VerifyToken from './lib/VerifyToken';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
// 	key: import.meta.env.VITE_PUSHER_APP_KEY || '',
// 	cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || '',
//     forceTLS: true
// });

const App = () => {
	const queryClient = new QueryClient();
	const location = useLocation(); // useLocation hook to get the current path
	const key = location.pathname.split('/')[1];
	let image = "";
	let className = "pt-16";
	if(key === "login" || key === "register" || key === "forgot-password" || key === "onboarding") {
		image = backgroundImage;
		className = "h-screen bg-cover bg-no-repeat bg-center"
	}

	window.scrollTo(0, 0);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<VerifyToken>
					<DashboardRoute />
				</VerifyToken>
			</Provider>
		</QueryClientProvider>
	);
};

export default App;