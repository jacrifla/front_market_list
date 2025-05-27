import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/user';

const userService = {
    getByEmail: (email) => fetchWrapper(`${endpointBase}/by-email`, 'POST', { email }),
    
    getById: (userId) => fetchWrapper(`${endpointBase}/${userId}`),

    createUser: (userData) => fetchWrapper(`${endpointBase}/create`, 'POST', userData),

    updateUser: (userId, userData) => fetchWrapper(`${endpointBase}/${userId}`, 'PUT', userData),

    restoreUser: (email) => fetchWrapper(`${endpointBase}/restore`, 'PATCH', { email }),

    resetPassword: (userData) => fetchWrapper(`${endpointBase}/reset-password`, 'PATCH', userData),

    login: (userData) => fetchWrapper(`${endpointBase}/login`, 'POST', userData),

    deleteUser: (userId) => fetchWrapper(`${endpointBase}/${userId}`, 'DELETE'),
};

export default userService;