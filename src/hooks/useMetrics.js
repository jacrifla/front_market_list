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

  const fetchMetricsData = useCallback(async (start, end) => {
    const [
      totalSpent,
      avgSpend,
      largestPurchase,
      avgDailySpend,
      mostPurchasedItems,
      categoryPurchases,
      topItemsByValue,
    ] = await Promise.all([
      getTotalSpentByPeriod(start, end),
      getAvgSpendPerPurchase(start, end),
      getLargestPurchase(start, end),
      getAvgDailySpend(start, end),
      getMostPurchasedItems(5),
      getCategoryPurchases(start, end),
      getTopItemsByValue(start, end),
    ]);

    return {
      totalSpent: Number(totalSpent) || 0,
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
