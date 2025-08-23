import { useState } from 'react';

import useMetricsService from '../hooks/useMetrics.js';
import MetricsFilterForm from '../components/metrics/MetricsFilterForm';
import MetricsSummary from '../components/metrics/MetricsSummary.jsx';
import MetricsMostPurchased from '../components/metrics/MetricsMostPurchased.jsx';
import MetricsCategoryPurchases from '../components/metrics/MetricsCategoryPurchases.jsx';
import MetricsTopItems from '../components/metrics/MetricsTopItems.jsx';
import useToastMessage from '../hooks/useToastMessage.js';
import MetricsComparisonSpent from '../components/metrics/MetricsComparisonSpent.jsx';

export default function Metrics() {
  const { fetchMetricsData } = useMetricsService();
  const { showToast } = useToastMessage();

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const currentYear = today.getFullYear();

  const defaultStart = `${currentYear}-01-01`;
  const defaultEnd = today.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  
  const handleFetchMetrics = async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchMetricsData(startDate, endDate, page, 5);
      setMetrics(data);
    } catch (err) {
      showToast('Erro ao buscar métricas.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container my-4">
      <h3 className="mb-3">Métricas de Compras</h3>

      <MetricsFilterForm
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSearch={handleFetchMetrics}
        loading={loading}
      />

      {metrics && (
        <div className="mt-4">
          <MetricsSummary {...metrics} />

          <MetricsMostPurchased
            items={metrics.mostPurchasedItems}
            meta={metrics.mostPurchasedMeta}
            onPageChange={(page) => handleFetchMetrics(page)}
          />

          <MetricsCategoryPurchases categories={metrics.categoryPurchases} />
          
          <MetricsTopItems items={metrics.topItemsByValue} />

          <MetricsComparisonSpent
            startDate={startDate}
            endDate={endDate}
            showToast={showToast}
          />
        </div>
      )}
    </div>
  );
}
