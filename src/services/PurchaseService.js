import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/purchase';

const purchaseService = {
    getTotalSpentByPeriod: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/total-spent${query}`);
    },

    getMostPurchasedItems: async (userId, limit) => {
        const query = `?userId=${userId}&limit=${limit}`;
        return fetchWrapper(`${endpointBase}/most-purchased${query}`);
    },
    
    getItemsPurchasedByPeriod: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/items-purchased${query}`);
    },

    getAvgSpendPerPurchase: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-spend-per-purchase${query}`);
    },

    getLargestPurchase: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/largest-purchase${query}`);
    },

    getAvgDailySpend: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-daily-spend${query}`);
    },

    getCategoryPurchases: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/category-purchases${query}`);
    },

    getComparisonSpent: async (userId, startDate, endDate, limit, offset) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=${offset}`;
        return fetchWrapper(`${endpointBase}/comparison-spent${query}`);
    },

    getTopItemsByValue: async (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/top-items-by-value${query}`);
    },
};

export default purchaseService;