import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/markets';

const marketService = {
    createMarket: async (name) => fetchWrapper(`${endpointBase}`, 'POST', { name }),

    updateMarket: async (marketId, name) => fetchWrapper(`${endpointBase}/${marketId}`, 'PUT', { name }),

    deleteMarket: async (marketId) => fetchWrapper(`${endpointBase}/${marketId}`, 'DELETE'),

    getAllMarkets: async () => fetchWrapper(`${endpointBase}`),
};

export default marketService;