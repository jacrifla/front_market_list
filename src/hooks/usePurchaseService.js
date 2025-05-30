import purchaseService from '../services/purchaseService';

const usePurchaseService = () => {
    const getTotalSpentByPeriod = async (userId, startDate, endDate) => {
        const res = await purchaseService.getTotalSpentByPeriod(userId, startDate, endDate);
        return res?.totalSpent ?? 0;
    };

    const getMostPurchasedItems = (userId, limit) =>
        purchaseService.getMostPurchasedItems(userId, limit);

    const getItemsPurchasedByPeriod = async (userId, startDate, endDate) => {
        const res = await purchaseService.getItemsPurchasedByPeriod(userId, startDate, endDate);
        return res?.totalQuantity ?? 0;
    };

    const getAvgSpendPerPurchase = async (userId, startDate, endDate) => {
        const res = await purchaseService.getAvgSpendPerPurchase(userId, startDate, endDate);
        return res?.avgSpendPerPurchase ?? 0;
    };

    const getLargestPurchase = async (userId, startDate, endDate) => {
        const res = await purchaseService.getLargestPurchase(userId, startDate, endDate);
        return typeof res === 'number' ? res : 0;
    };

    const getAvgDailySpend = async (userId, startDate, endDate) => {
        const res = await purchaseService.getAvgDailySpend(userId, startDate, endDate);
        return res?.avgDailySpend ?? 0;
    };

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
