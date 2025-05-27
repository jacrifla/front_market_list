export async function fetchWrapper(endpoint, method = 'GET', body = null, headers = {}) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${URL}${endpoint}`, config);
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