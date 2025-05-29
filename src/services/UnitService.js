import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/unit';

const unitService = {
    createUnit: async (unitName) => await fetchWrapper(`${endpointBase}`, 'POST', { unitName }),

    updateUnit: async (unitId, unitName) => await fetchWrapper(`${endpointBase}/${unitId}`, 'PUT', { unitName }),

    deleteUnit: async (unitId) => await fetchWrapper(`${endpointBase}/${unitId}`, 'DELETE'),

    getAllUnits: async () => await fetchWrapper(`${endpointBase}`),
};

export default unitService;