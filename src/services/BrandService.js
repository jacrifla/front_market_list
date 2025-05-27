import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/brand';

const brandService = {
    createBrand: (brandName) => fetchWrapper(`${endpointBase}`, 'POST', { brandName }),

    updateBrand: (brandId, brandName) => fetchWrapper(`${endpointBase}/${brandId}`, 'PUT', { brandName }),

    deleteBrand: (brandId) => fetchWrapper(`${endpointBase}/${brandId}`, 'DELETE'),

    getAllBrands: () => fetchWrapper(`${endpointBase}/all`),
};

export default brandService;