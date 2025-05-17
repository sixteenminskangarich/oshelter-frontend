"use client"
import { useQuery } from 'react-query';

export async function fetchOnboarding(token) {
	try {
		const res = await fetch(
			`${import.meta.env.VITE_APP_SERVICE_URL}/user/onboarding`,
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

export const updateOwnerType = async(values, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/onboarding`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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