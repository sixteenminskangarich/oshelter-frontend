import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<SettingsProvider>
			<React.StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</React.StrictMode>
		</SettingsProvider>
	</AuthProvider>
);