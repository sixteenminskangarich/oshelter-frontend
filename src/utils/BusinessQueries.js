import axios from "axios";

export const saveBusiness = async(values, token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/create`, values, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const saveFileAndDescription = async(values, token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVICE_URL}/provider/business/file-and-description/create`, values, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const saveImage = async(image, token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVICE_URL}/image/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: image
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}