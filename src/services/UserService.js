import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/user';

const userService = {
    getByEmail: async (email) => await fetchWrapper(`${endpointBase}/by-email`, 'POST', { email }),
    
    getById: async (userId) => await fetchWrapper(`${endpointBase}/${userId}`),

    createUser: async (userData) => await fetchWrapper(`${endpointBase}/create`, 'POST', userData),

    updateUser: async (userId, userData) => await fetchWrapper(`${endpointBase}/${userId}`, 'PUT', userData),

    restoreUser: async (email) => await fetchWrapper(`${endpointBase}/restore`, 'PATCH', { email }),

    resetPassword: async (userData) => await fetchWrapper(`${endpointBase}/reset-password`, 'PATCH', userData),

    login: async (userData) => await fetchWrapper(`${endpointBase}/login`, 'POST', userData),

    deleteUser: async (userId) => await fetchWrapper(`${endpointBase}/${userId}`, 'DELETE'),
};

export default userService;