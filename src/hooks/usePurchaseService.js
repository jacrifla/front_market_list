import { useCallback } from 'react';
import purchaseService from '../services/purchaseService';

const usePurchaseService = () => {
    const getTotalSpentByPeriod = async (startDate, endDate) => {
        const res = await purchaseService.getTotalSpentByPeriod(startDate, endDate);
        return res?.totalSpent ?? 0;
    };

    const getMostPurchasedItems = (limit) =>
        purchaseService.getMostPurchasedItems(limit);

    const getItemsPurchasedByPeriod = async (startDate, endDate) => {
        const res = await purchaseService.getItemsPurchasedByPeriod(startDate, endDate);
        return res?.totalQuantity ?? 0;
    };

    const getAvgSpendPerPurchase = async (startDate, endDate) => {
        const res = await purchaseService.getAvgSpendPerPurchase(startDate, endDate);
        return res?.avgSpendPerPurchase ?? 0;
    };

    const getLargestPurchase = async (startDate, endDate) => {
        const res = await purchaseService.getLargestPurchase(startDate, endDate);
        return typeof res === 'number' ? res : 0;
    };

    const getAvgDailySpend = async (startDate, endDate) => {
        const res = await purchaseService.getAvgDailySpend(startDate, endDate);
        return res?.avgDailySpend ?? 0;
    };

    const getCategoryPurchases = (startDate, endDate) =>
        purchaseService.getCategoryPurchases(startDate, endDate);

    const getComparisonSpent = useCallback(
        (startDate, endDate, page = 1, limit = 10) =>
            purchaseService.getComparisonSpent(startDate, endDate, page, limit),
        []
    );

    const getTopItemsByValue = (startDate, endDate) =>
        purchaseService.getTopItemsByValue(startDate, endDate);

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
