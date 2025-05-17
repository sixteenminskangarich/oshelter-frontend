/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}', 
		flowbite.content(),
		"./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		colors: {
			'bg-color': '#283890',
			'bg-drawer': '#333333',
			'bg-drawer-amount': '#C9DCF9',
			white: '#ffff',
			'black-text': '#000',
			'placeholder-Text': '#9F9D9E',
			'hero-color': '#00188A',
			'sigin-color': '#f5f5f5',
			'signup-color': '#262626',
			'red-color': '#FF0000',
			'star-color': '#AF743E',
			'light-gray': '#8C8D90',
			'category-icons': '#ECECEC',
		},
		extend: {
			width: {
				'search-width': '538px',
				'selct-width': '300px',
				'category-icons': '400px',
				w70: '70%',
				w30: '30%',
				w100: '100%',
			},
			height: {
				796: '700px',
			},

			fontFamily: {
				'josefin-sans': '"Josefin Sans",',
				
				'roboto-font': 'Roboto',
			},
			fontSize: {
				'text-footer': '14.2px',
				'text-sm': '12px',
				'text-xs': '10px',
			},
		},
	},
	plugins: [
		flowbite.plugin(),
		require('flowbite/plugin')({
			wysiwyg: true,
		}),
	],
};