"use client"
import { useQuery } from 'react-query';

export const listOfServicesUnderProvider = (id) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return useQuery({
		queryKey: ['services', id],
		queryFn: async () => {
			try {
                const a = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/services/${id}`, {
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

export const bookServices = async(data, id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/book/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const checkIfServiceBooked = async(id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/book/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const paystackSuccess = async(reference, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/verify/handleChargeSuccess/${reference}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const paymentServices = async(data, id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/book/${id}/payment`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const approveBookings = async(id, token, data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/orders/${id}/accept`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const changeStatusOrdered = async(id, token, data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ state: data })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const declineBookings = async(id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/orders/${id}/reject`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export const rejectBookings = async(id, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/user/orders/${id}/cancel`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}