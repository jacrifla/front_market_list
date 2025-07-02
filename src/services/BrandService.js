import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/brand';

const brandService = {
    createBrand: async (name) => fetchWrapper(`${endpointBase}`, 'POST', { name }),

    updateBrand: async (id, name) => fetchWrapper(`${endpointBase}/${id}`, 'PUT', { name }),

    deleteBrand: async (id) => fetchWrapper(`${endpointBase}/${id}`, 'DELETE'),

    getAllBrands: async () => fetchWrapper(`${endpointBase}/all`),
};

export default brandService;