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

  const fetchMetricsData = useCallback(async (start, end, page = 1, limit = 50) => {
    const [
      { totalSpent },
      { avgSpendPerPurchase },
      largestPurchase,
      { avgDailySpend },
      mostPurchasedItems,
      categoryPurchases,
      topItemsByValue,
    ] = await Promise.all([
      getTotalSpentByPeriod(start, end),
      getAvgSpendPerPurchase(start, end),
      getLargestPurchase(start, end),
      getAvgDailySpend(start, end),
      getMostPurchasedItems(start, end, page, limit),
      getCategoryPurchases(start, end),
      getTopItemsByValue(start, end),
    ]);

    return {
      totalSpent: Number(totalSpent) || 0,
      avgSpend: Number(avgSpendPerPurchase) || 0,
      largestPurchase: Number(largestPurchase) || 0,
      avgDailySpend: Number(avgDailySpend) || 0,
      mostPurchasedItems: mostPurchasedItems.items || [],
      mostPurchasedMeta: {
        totalItems: mostPurchasedItems.totalItems,
        totalPages: mostPurchasedItems.totalPages,
        page: mostPurchasedItems.page,
        limit: mostPurchasedItems.limit,
      },
      categoryPurchases: categoryPurchases || [],
      topItemsByValue: topItemsByValue || [],
    };
  }, [
    getTotalSpentByPeriod,
    getAvgSpendPerPurchase,
    getLargestPurchase,
    getAvgDailySpend,
    getMostPurchasedItems,
    getCategoryPurchases,
    getTopItemsByValue,
  ]);

  return { fetchMetricsData };
}
