import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/markets';

const marketService = {
    createMarket: (marketName) => fetchWrapper(`${endpointBase}`, 'POST', { marketName }),

    updateMarket: (marketId, marketName) => fetchWrapper(`${endpointBase}/${marketId}`, 'PUT', { marketName }),

    deleteMarket: (marketId) => fetchWrapper(`${endpointBase}/${marketId}`, 'DELETE'),

    getAllMarkets: () => fetchWrapper(`${endpointBase}`),
};

export default marketService;