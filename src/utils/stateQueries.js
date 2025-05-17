import { useQuery } from 'react-query';
import { getPropertyType, fetchAllProperties, getPropertyById, getTypeOfProperty, getAllEventSpace, fetchAllEvents } from './request';

export function useProperty(key) {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await getPropertyType(key);
			return response.data;
		},
	});
}

export function useEventSpace() {
	return useQuery({
		queryKey: ['eventspace'],
		queryFn: getAllEventSpace,
	});
}

export function useTypeOfProperty(key) {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await getTypeOfProperty(key);
			return response.data;
		},
	});
}

export function useOtherProperties(key) {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await fetchAllProperties(key);
			return response.data;
		},
	});
}

export function usePropertyDetails(key, token) {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await getPropertyById(key, token);
			return response.data;
		},
	});
}

export const listOfProperties = (id) => {
	return useQuery({
		queryKey: ['business', id],
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/${id}/profile`, {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const res = await a.json()
                return res
            } catch (e) {
                return e
            }
		},
	});
}

export const filterEvents = (key) => {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await fetchAllEvents(key);
			return response.data;
		},
	});
}

export const listOfEvents = (id) => {
	return useQuery({
		queryKey: ['events', id],
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/eventspace/${id}`, {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const res = await a.json()
                return res
            } catch (e) {
                return e
            }
		},
	});
}

export const addWishListProperty = (id, token) => {
	return useQuery({
		queryKey: ['addToWishList', id, token],
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/wish-lists/${id}`, {
                method: "POST",
                    headers: {
                        "Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
                    },
                })
                const res = await a.json()
                return res
            } catch (e) {
                return e
            }
		},
	});
}

export function wishList(token) {
	return useQuery({
		queryKey: ['wishlist', token],
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/wish-lists`, {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
                    },
                })
                const res = await a.json()
                return res
            } catch (e) {
                return e
            }
		},
	});
}

export function listOfTestimonial() {
	return useQuery({
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/testimonial`, {
                method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const res = await a.json()
                return res
            } catch (e) {
                return e
            }
		},
	});
}