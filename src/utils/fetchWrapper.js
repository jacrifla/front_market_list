import { API_BASE_URL } from './api';

export async function fetchWrapper(endpoint, method = 'GET', body = null, headers = {}) {
    const token = localStorage.getItem('token');
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
             ...(token && !headers.Authorization && { Authorization: `Bearer ${token}` }),
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const responseData = await response.json();

        if (!response.ok || !responseData.status) {
            throw new Error(responseData.message || "Erro desconhecido");            
        }

        return responseData.data;
    } catch (error) {
        console.error(`erro na API ${method} ${endpoint}: ${error.message}`);
        throw error;        
    }
}