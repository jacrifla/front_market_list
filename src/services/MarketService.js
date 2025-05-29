import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/markets';

const marketService = {
    createMarket: async (marketName) => fetchWrapper(`${endpointBase}`, 'POST', { marketName }),

    updateMarket: async (marketId, marketName) => fetchWrapper(`${endpointBase}/${marketId}`, 'PUT', { marketName }),

    deleteMarket: async (marketId) => fetchWrapper(`${endpointBase}/${marketId}`, 'DELETE'),

    getAllMarkets: async () => fetchWrapper(`${endpointBase}`),
};

export default marketService;