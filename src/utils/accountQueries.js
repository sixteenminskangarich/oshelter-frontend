import axios from "axios";

export async function switchAccount(values, token) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_APP_SERVICE_URL}/user/switch`,
            values,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response
    }catch (error) {
        console.log(error);
    }
}