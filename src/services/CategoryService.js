import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/category';

const categoryService = {
    createCategory: async (categoryName) => fetchWrapper(`${endpointBase}`, 'POST', { categoryName }),

    updateCategory: async (categoryId, categoryName) => fetchWrapper(`${endpointBase}/${categoryId}`, 'PUT', { categoryName }),

    deleteCategory: async (categoryId) => fetchWrapper(`${endpointBase}/${categoryId}`, 'DELETE'),

    getAllCategorys: async () => fetchWrapper(`${endpointBase}/all`),
};

export default categoryService;