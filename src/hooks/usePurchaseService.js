import purchaseService from '../services/purchaseService';

const usePurchaseService = () => {
    const getTotalSpentByPeriod = (userId, startDate, endDate) =>
        purchaseService.getTotalSpentByPeriod(userId, startDate, endDate);

    const getMostPurchasedItems = (userId, limit) =>
        purchaseService.getMostPurchasedItems(userId, limit);

    const getItemsPurchasedByPeriod = (userId, startDate, endDate) =>
        purchaseService.getItemsPurchasedByPeriod(userId, startDate, endDate);

    const getAvgSpendPerPurchase = (userId, startDate, endDate) =>
        purchaseService.getAvgSpendPerPurchase(userId, startDate, endDate);

    const getLargestPurchase = (userId, startDate, endDate) =>
        purchaseService.getLargestPurchase(userId, startDate, endDate);

    const getAvgDailySpend = (userId, startDate, endDate) =>
        purchaseService.getAvgDailySpend(userId, startDate, endDate);

    const getCategoryPurchases = (userId, startDate, endDate) =>
        purchaseService.getCategoryPurchases(userId, startDate, endDate);

    const getComparisonSpent = (userId, startDate, endDate, limit, offset) =>
        purchaseService.getComparisonSpent(userId, startDate, endDate, limit, offset);

    const getTopItemsByValue = (userId, startDate, endDate) =>
        purchaseService.getTopItemsByValue(userId, startDate, endDate);

    return {
        getTotalSpentByPeriod,
        getMostPurchasedItems,
        getItemsPurchasedByPeriod,
        getAvgSpendPerPurchase,
        getLargestPurchase,
        getAvgDailySpend,
        getCategoryPurchases,
        getComparisonSpent,
        getTopItemsByValue,
    };
};

export default usePurchaseService;
