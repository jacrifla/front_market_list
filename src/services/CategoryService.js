import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/category';

const categoryService = {
    createCategory: async (category) => fetchWrapper(`${endpointBase}`, 'POST', category),
    
    updateCategory: async (categoryId, category) => fetchWrapper(`${endpointBase}/${categoryId}`, 'PUT', category),

    deleteCategory: async (categoryId) => fetchWrapper(`${endpointBase}/${categoryId}`, 'DELETE'),

    getAllCategorys: async () => fetchWrapper(`${endpointBase}/all`),
};

export default categoryService;