import { useQuery } from 'react-query';
import { getPropertyType } from '../../src/utils/request';
import axios from 'axios';
export const useProperty = (key) => {
	return useQuery({
		queryKey: ['property', key],
		queryFn: async () => {
			const response = await getPropertyType(key);
			return response.data;
		},
	});
};

export const useCategories = () => {
	return useQuery({
		queryKey: ['propertyType'],
		queryFn: async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_SERVICE_URL}/home/categories`
			);
			return response.data;
		},
	});
};

export const useGetPropertyDetails = (id) => {
	return useQuery({
		queryKey: ['propertyDetails', id],
		queryFn: async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_SERVICE_URL}/home/properties/${id}`
			);
			return response.data;
		},
	});
};

export const useGetPropertyById = (key) => {
	return useQuery({
		queryKey: ['propertyById', key],
		queryFn: async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_SERVICE_URL}/home/category?key=${key}`
			);
			return response.data?.data;
		},
	});
};

export const useGetPropetyByLocation = (q) => {
	return useQuery({
		queryKey: ['propertyByLocation', q],
		queryFn: async () => {
			const response = await axios.get(
				`${
					import.meta.env.VITE_APP_SERVICE_URL
				}/home/properties/location?key=${q}`
			);
			return response?.data?.data?.properties?.data;
		},
	});
};