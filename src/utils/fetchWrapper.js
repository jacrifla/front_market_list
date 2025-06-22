import { API_BASE_URL } from './api';

const DEFAULT_TIMEOUT = 15000;

export async function fetchWrapper(endpoint, method = 'GET', body = null, headers = {}, timeout = DEFAULT_TIMEOUT) {
    const token = localStorage.getItem('token');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const isFormData = body instanceof FormData;

    const config = {
        method,
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...headers,
            ...(token && !headers.Authorization && { Authorization: `Bearer ${token}` }),
        },
        signal: controller.signal,
    };

    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        clearTimeout(timer);

        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        const responseData = isJson ? await response.json() : null;

        if (!response.ok) {
            const errorMessage = responseData?.message || `Erro HTTP ${response.status}`;
            throw new Error(errorMessage);
        }

        if (isJson && responseData?.status === false) {
            throw new Error(responseData.message || 'Erro desconhecido');
        }

        return isJson ? responseData?.data ?? responseData : response;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error(`⏱️ Timeout: API ${method} ${endpoint}`);
            throw new Error('Tempo de resposta excedido. Tente novamente.');
        }

        console.error(`❌ Erro na API ${method} ${endpoint}:`, error.message);
        throw error;
    }
}