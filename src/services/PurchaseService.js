import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/purchase';

const purchaseService = {
    getTotalSpentByPeriod: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/total-spent${query}`);
    },

    getMostPurchasedItems: (userId, limit) => {
        const query = `?userId=${userId}&limit=${limit}`;
        return fetchWrapper(`${endpointBase}/most-purchased${query}`);
    },
    
    getItemsPurchasedByPeriod: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/items-purchased${query}`);
    },
    getAvgSpendPerPurchase: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-spend-per-purchase${query}`);
    },
    getLargestPurchase: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/largest-purchase${query}`);
    },
    getAvgDailySpend: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/avg-daily-spend${query}`);
    },
    getCategoryPurchases: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/category-purchases${query}`);
    },
    getComparisonSpent: (userId, startDate, endDate, limit, offset) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=${offset}`;
        return fetchWrapper(`${endpointBase}/comparison-spent${query}`);
    },
    getTopItemsByValue: (userId, startDate, endDate) => {
        const query = `?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
        return fetchWrapper(`${endpointBase}/top-items-by-value${query}`);
    },
};

export default purchaseService;