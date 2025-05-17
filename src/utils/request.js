
import axios from 'axios';

export async function getCategories() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/services/categories`
		);
		const category = await res.json();

		return category;
	} catch (error) {
		console.log(error);
	}
}

export async function getBusinesses(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const business = await res.json();

		return business;
	} catch (error) {
		console.log(error);
	}
}

export async function getLnaguage() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/services/data`
		);
		const language = await res.json();

		return language;
	} catch (error) {
		console.log(error);
	}
}

export async function getAllServices() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/services`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function getServiceByCategory(category) {
	const res = await fetch(
		`${
			import.meta.env.VITE_APP_SERVICE_URL
		}/services/services/category?key${category}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	const services = await res.json();

	return services;
}

export async function updateUserProfile(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const profile = await res.json();

		return profile;
	} catch (error) {
		console.log(error);
	}
}
export async function getUserProfile(token) {
	// Fetch the service data
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const profile = await res.json();

		return profile;
	} catch (error) {
		console.log(error);
	}
}
export async function getServiceById(id) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/services/services/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return res.json();
	} catch (error) {
		console.log(error);
	}
}
export async function getYearsOfExperience() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/services/data`
		);

		return res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function getAllProperties() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const properties = await res.json();
		return properties?.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getAllEventSpace() {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/eventspace`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const properties = await res.json();
		return properties?.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getPropertyById(id, token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/show`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
			}
		);
		return res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function getBussinessPayment(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const business = await res.json();

		return business;
	} catch (error) {
		console.log(error);
	}
}

export async function getPropertyType(type) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/home/properties/other/${type}`
		);
		const propertyType = await res.json();
		return propertyType;
	} catch (error) {
		console.log(error);
	}
}

export async function getTypeOfProperty(type) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/home/properties/typeofproperties/${type}`
		);
		const properties = await res.json();
		return properties;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAllProperties(type) {
	// Fetch the service data
	console.log(type);
	try {
		const res = await fetch(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/home/properties/all/${type}`
		);
		const propertyType = await res.json();
		return propertyType;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchAllEvents(type) {
	// Fetch the service data
	console.log(type);
	try {
		const res = await fetch(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/home/properties/eventspace/${type}`
		);
		const propertyType = await res.json();
		return propertyType;
	} catch (error) {
		console.log(error);
	}
}
export const getRejectReasons = async (token) => {
    try {
		const response = await axios.get(`${import.meta.env.VITE_APP_SERVICE_URL}/user/rejectReasons`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		//
	}
};

export const cancelOrder = async (token, data) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/cancelOrder`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Ensure the content type is set
            },
            body: JSON.stringify(data), // Pass the data object here
        });
        const response = await res.json(); // Await the JSON response
        return response;
    } catch (error) {
        console.error('Error in cancelOrder:', error); // Log the error for debugging
    }
};

export const fetchUserOrderedServices = async (token) => {
    try {
		const response = await axios.get(`${import.meta.env.VITE_APP_SERVICE_URL}/user/orders/fetchUserOrderedServices`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		//
	}
};

export const fetchOrdersB = async (activeTab, token, status = '', search = '', page = 1, perPage = 10, serviceFilter = '') => {
    try {
		const response = await axios.get(`${import.meta.env.VITE_APP_SERVICE_URL}/user/fetchOrders`, {
			params: { tab: activeTab, status, search, page, perPage, serviceFilter },
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		//
	}
};

export async function makeCashPayment(type, id, amount, mode, token) {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/user/makeCashPayment/${type}/${id}/${amount}/${mode}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
	}
}

export async function makePayment(type, id, amount, mode, token) {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/user/makePayment/${type}/${id}/${amount}/${mode}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
	}
}
export async function fetchorders(status, token) {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/user/orders`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
	}
}

export async function fetchBookings(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/bookings`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const bookings = await res.json();
		return bookings;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchBookingsByState(state, token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/bookings/${state}/homes`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const bookings = await res.json();
		return bookings;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchUserBookings(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/myspaces`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const bookings = await res.json();
		return bookings;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchBooking(token, id) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/bookings/${id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const bookings = await res.json();
		return bookings;
	} catch (error) {
		console.log(error);
	}
}

export async function fetchUserPayment(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/user/payment`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.json();
	} catch (error) {
		console.log(error);
	}
}

export async function bookShortStay(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/bookings`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function saveBookTour(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/tour`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function getAllAgentCareTaker(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/agents`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const agents = await res.json();

		return agents;
	} catch (error) {
		console.log(error);
	}
}

export async function addAgentCaretaker(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/agents/create`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function showAgentCaretaker(id, token) {
	console.log(id)
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/agents/${id}/show`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}


export async function editAgentCaretaker(id, data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/agents/${id}/update`, 
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function getProperties(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const properties = await res.json();
		return properties;
	} catch (error) {
		console.log(error);
	}
}

export async function getPropertiesByStatus(search, token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${search}/properties`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const properties = await res.json();
		return properties;
	} catch (error) {
		console.log(error);
	}
}

export async function advancedSearchForProperties(values) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties?marketType=${values.marketType}&category=${values.category}&minPrice=${values.minPrice}&maxPrice=${values.maxPrice}&minBed=${values.minBed}&maxBed=${values.maxBed}&minBath=${values.minBath}&maxBath=${values.maxBath}&type=${values.type}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			}
		);
		const properties = await res.json();
		return properties;
	} catch (error) {
		console.log(error)
	}
}

export async function newProperty(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		); 
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateProperty(externalId, data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${externalId}/update`, 
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		); 
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyAmenities(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveAmenity`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyRules(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveRules`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function saveVideoUrl(data, token, id) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveVideoUrl`,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyDetailed(data, token, id) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveDetails`,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyFiles(data, token, id) {
	const formData = new FormData();
  	formData.append("photos", data);
  	formData.append("isFeatured", true);

	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/photos`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			}
		);
		const response = res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyPackage(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/savePackages`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: data
			}
		);
		const response = res.json();
		return response;
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyService(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveServices`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: data
			}
		);
		const response = res.json();
		return response;
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyMultipleFiles(data, token, id) {
	const formData = new FormData();
  	formData.append("photos", data);
  	formData.append("isFeatured", true);

	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/photos`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			}
		);
		const response = res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function savePricingAndSchedule(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/savePricingAndSchedule`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function savePropertyUnits(data, token, id) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveUnits`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	}catch (error) {
		console.log(error);
	}
}

export async function saveFinishLIne(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/${id}/saveLastStep`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function getAmenities(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/amenities`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const amentities = await res.json();
		return amentities;
	} catch (error) {
		console.log(error);
	}
}

export async function getRules(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/rules`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const amentities = await res.json();
		return amentities;
	} catch (error) {
		console.log(error);
	}
}

export async function getBookTourRequest(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/properties/tour`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const tours = await res.json();
		return tours;
	} catch (error) {
		console.log(error);
	}
}

export async function getSingleBookTourRequest(token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/tour/${id}`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
			}
		);
		const tours = await res.json();
		return tours;
	}catch (error) {
		console.log(error);
	}
}

export async function updateBookings(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/bookings/${id}/status`, 
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function rejectBookings(id, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/bookings/${id}/reject`, 
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateTourRequest(data, token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/tour/${id}/agent`, 
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function cancelTourRequest(token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/properties/tour/${id}/cancel`, 
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function switchAccount(values, token) {
	try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/switch`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export async function showAgent(token, id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/agents/${id}/show`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
			}
		);
		const agent = await res.json();
		return agent;
	}catch (error) {
		console.log(error);
	}
}

export async function updateProfile(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function changeAccount(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function showId(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateId(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-profile`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateProfilePhoto(data, token) {
	try {
			const response = await axios.post(
				`${import.meta.env.VITE_APP_SERVICE_URL}/user/update-photo`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return response
		}catch (error) {
			console.log(error);
		}
}

export async function createBank(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/banks`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function fetchBanks(token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/banks`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function showBank(id, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/banks/${id}`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateBank(id, data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/banks/${id}`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function verifyOtp(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/verify`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function changePassword(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/change-password`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function updateIdentification(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/identifications`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data
			}
		); 
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function fetchServices(token) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const properties = await res.json();
		return properties?.data;
	} catch (error) {
		console.log(error);
	}
}

export async function saveService(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services/create`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: data
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function fetchService(token, externalId) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services/${externalId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const service = await res.json();
		return service?.data;
	} catch (error) {
		console.log(error);
	}
}

export async function editService(data, token, externalId) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/services/${externalId}/update`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: data
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function fetchUsersOrders(status, token) {
	try {
		const response = await axios.get(
			`${
				import.meta.env.VITE_APP_SERVICE_URL
			}/provider/business/orders`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching orders:', error);
	}
}

export async function fetchOrder(token, externalId) {
	// Fetch the service data
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/orders/${externalId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const orders = await res.json();
		return orders?.data;
	} catch (error) {
		console.log(error);
	}
}

export async function acceptOrder(id, state, price, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/orders/update/${id}/${state}/${price}`, 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function sendReview(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/newReview`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function checkEmail(id) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/forgot-password`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: id})
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}


export async function forgotPassword(values) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/forgot-password`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function verifyOtpForgotPassword(code , phonenNumber) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/otp/verify`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phoneNumber: phonenNumber, otpCode: code})
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function resetPassword(values) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/reset-password`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function sendOtp(values) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/otp`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}

export async function addWishListProperty (id, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/wish-lists/${id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const response = res.json()

		return response
	}catch (error) {
		console.log(error);
	}
}

export async function findWishListItem (id, user_id, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/wish-lists/${id}/${user_id}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const response = res.json()
		return response
	}catch (error) {
		console.log(error);
	}
}

export async function searchPropertyBasedOnCategory(values) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/search`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values)
			}
		);
		const response = res.json()
		return response
	}catch (error) {
		console.log(error);
	}
}

export async function searchForProperty(values) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/search`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values)
			}
		);
		const response = res.json()
		return response
	}catch (error) {
		console.log(error);
	}
}

export async function saveTestimonial(data, token) {
	try {
		const res = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/testimonial`, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			}
		);
		return res.json();
	}catch (error) {
		console.log(error);
	}
}