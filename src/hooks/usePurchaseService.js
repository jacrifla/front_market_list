import { useCallback } from 'react';
import purchaseService from '../services/PurchaseService';

export default function usePurchaseService() {
    const getTotalSpentByPeriod = useCallback(
        (startDate, endDate) => purchaseService.getTotalSpentByPeriod(startDate, endDate),
        []
    );

    const getAvgSpendPerPurchase = useCallback(
        (startDate, endDate) => purchaseService.getAvgSpendPerPurchase(startDate, endDate),
        []
    );

    const getLargestPurchase = useCallback(
        (startDate, endDate) => purchaseService.getLargestPurchase(startDate, endDate),
        []
    );

    const getAvgDailySpend = useCallback(
        (startDate, endDate) => purchaseService.getAvgDailySpend(startDate, endDate),
        []
    );

    const getMostPurchasedItems = useCallback(
        (startDate, endDate, limit = 5) => purchaseService.getMostPurchasedItems(startDate, endDate, limit),
        []
    );

    const getCategoryPurchases = useCallback(
        (startDate, endDate) => purchaseService.getCategoryPurchases(startDate, endDate),
        []
    );

    const getTopItemsByValue = useCallback(
        (startDate, endDate) => purchaseService.getTopItemsByValue(startDate, endDate),
        []
    );

    const getComparisonSpent = useCallback(
        (startDate, endDate, page = 1, limit = 10) =>
            purchaseService.getComparisonSpent(startDate, endDate, page, limit),
        []
    );

    return {
        getTotalSpentByPeriod,
        getAvgSpendPerPurchase,
        getLargestPurchase,
        getAvgDailySpend,
        getMostPurchasedItems,
        getCategoryPurchases,
        getTopItemsByValue,
        getComparisonSpent,
    };
}
