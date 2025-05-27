import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/unit';

const unitService = {
    createUnit: (unitName) => fetchWrapper(`${endpointBase}`, 'POST', { unitName }),

    updateUnit: (unitId, unitName) => fetchWrapper(`${endpointBase}/${unitId}`, 'PUT', { unitName }),

    deleteUnit: (unitId) => fetchWrapper(`${endpointBase}/${unitId}`, 'DELETE'),

    getAllUnits: () => fetchWrapper(`${endpointBase}`),
};

export default unitService;