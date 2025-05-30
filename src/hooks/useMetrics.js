import { useCallback } from 'react';
import usePurchaseService from './usePurchaseService';

export default function useMetricsService() {
  const {
    getTotalSpentByPeriod,
    getAvgSpendPerPurchase,
    getLargestPurchase,
    getAvgDailySpend,
    getMostPurchasedItems,
    getCategoryPurchases,
    getTopItemsByValue,
  } = usePurchaseService();

  const fetchMetricsData = useCallback(async (userId, start, end) => {
    const [
      totalSpent,
      avgSpend,
      largestPurchase,
      avgDailySpend,
      mostPurchasedItems,
      categoryPurchases,
      topItemsByValue,
    ] = await Promise.all([
      getTotalSpentByPeriod(userId, start, end),
      getAvgSpendPerPurchase(userId, start, end),
      getLargestPurchase(userId, start, end),
      getAvgDailySpend(userId, start, end),
      getMostPurchasedItems(userId, 5),
      getCategoryPurchases(userId, start, end),
      getTopItemsByValue(userId, start, end),
    ]);

    return {
      totalSpent: Number(totalSpent?.totalSpent) || 0,
      avgSpend: Number(avgSpend) || 0,
      largestPurchase: Number(largestPurchase) || 0,
      avgDailySpend: Number(avgDailySpend) || 0,
      mostPurchasedItems: mostPurchasedItems || [],
      categoryPurchases: categoryPurchases || [],
      topItemsByValue: topItemsByValue || [],
    };
  }, []);

  return { fetchMetricsData };
}
