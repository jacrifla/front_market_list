import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/purchase';

const purchaseService = {
    getTotalSpentByPeriod: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/total-spent${query}`);
    },

    getMostPurchasedItems: async (limit) => {
        const query = `?limit=${limit}`;
        return fetchWrapper(`${endpointBase}/most-purchased${query}`);
    },
    
    getItemsPurchasedByPeriod: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/items-purchased${query}`);
    },

    getAvgSpendPerPurchase: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-spend-per-purchase${query}`);
    },

    getLargestPurchase: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/largest-purchase${query}`);
    },

    getAvgDailySpend: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-daily-spend${query}`);
    },

    getCategoryPurchases: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/category-purchases${query}`);
    },

    getComparisonSpent: async (startDate, endDate, page = 1, limit = 10) => {
        const query = `?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
        return fetchWrapper(`${endpointBase}/comparison-spent${query}`);
    },

    getTopItemsByValue: async (startDate, endDate) => {
        const query = `?startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/top-items-by-value${query}`);
    },
};

export default purchaseService;