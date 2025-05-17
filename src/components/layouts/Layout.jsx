/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
