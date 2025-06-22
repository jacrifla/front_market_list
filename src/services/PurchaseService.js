import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/purchase';

const withQuery = (path, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return `${endpointBase}/${path}?${query}`;
};

const purchaseService = {
  getTotalSpentByPeriod: async (startDate, endDate) =>
    fetchWrapper(withQuery('total-spent', { startDate, endDate })),

  getMostPurchasedItems: async (limit) =>
    fetchWrapper(withQuery('most-purchased', { limit })),

  getItemsPurchasedByPeriod: async (startDate, endDate) =>
    fetchWrapper(withQuery('items-purchased', { startDate, endDate })),

  getAvgSpendPerPurchase: async (startDate, endDate) =>
    fetchWrapper(withQuery('avg-spend-per-purchase', { startDate, endDate })),

  getLargestPurchase: async (startDate, endDate) =>
    fetchWrapper(withQuery('largest-purchase', { startDate, endDate })),

  getAvgDailySpend: async (startDate, endDate) =>
    fetchWrapper(withQuery('avg-daily-spend', { startDate, endDate })),

  getCategoryPurchases: async (startDate, endDate) =>
    fetchWrapper(withQuery('category-purchases', { startDate, endDate })),

  getComparisonSpent: async (startDate, endDate, page = 1, limit = 10) =>
    fetchWrapper(withQuery('comparison-spent', { startDate, endDate, page, limit })),

  getTopItemsByValue: async (startDate, endDate) =>
    fetchWrapper(withQuery('top-items-by-value', { startDate, endDate })),
};

export default purchaseService;
