import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/brand';

const brandService = {
    createBrand: async (brandName) => fetchWrapper(`${endpointBase}`, 'POST', { brandName }),

    updateBrand: async (brandId, brandName) => fetchWrapper(`${endpointBase}/${brandId}`, 'PUT', { brandName }),

    deleteBrand: async (brandId) => fetchWrapper(`${endpointBase}/${brandId}`, 'DELETE'),

    getAllBrands: async () => fetchWrapper(`${endpointBase}/all`),
};

export default brandService;