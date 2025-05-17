"use client"
import { useQuery } from 'react-query';

export async function fetchDashboardItems(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/user`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const response = await res.json();
		return response;
	} catch (error) {
		console.log(error);
	}
}