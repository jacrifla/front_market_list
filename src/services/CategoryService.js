import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/category';

const categoryService = {
    createCategory: (categoryName) => fetchWrapper(`${endpointBase}`, 'POST', { categoryName }),

    updateCategory: (categoryId, categoryName) => fetchWrapper(`${endpointBase}/${categoryId}`, 'PUT', { categoryName }),

    deleteCategory: (categoryId) => fetchWrapper(`${endpointBase}/${categoryId}`, 'DELETE'),

    getAllCategorys: () => fetchWrapper(`${endpointBase}/all`),
};

export default categoryService;