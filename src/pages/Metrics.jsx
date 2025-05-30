import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import useMetricsService from '../hooks/useMetrics.js';
import MetricsFilterForm from '../components/metrics/MetricsFilterForm';
import MetricsSummary from '../components/metrics/MetricsSummary.jsx';
import MetricsMostPurchased from '../components/metrics/MetricsMostPurchased.jsx';
import MetricsCategoryPurchases from '../components/metrics/MetricsCategoryPurchases.jsx';
import MetricsTopItems from '../components/metrics/MetricsTopItems.jsx';

export default function Metrics() {
  const { user } = useContext(AuthContext);
  const { fetchMetricsData } = useMetricsService();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchMetrics = async () => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const start = startDate || `${currentYear}-01-01`;
    const end = endDate || today.toISOString().split('T')[0];

    setLoading(true);
    try {
      const data = await fetchMetricsData(user.userId, start, end);
      setMetrics(data);
    } catch (err) {
      alert('Erro ao buscar métricas.');
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
          <MetricsMostPurchased items={metrics.mostPurchasedItems} />
          <MetricsCategoryPurchases categories={metrics.categoryPurchases} />
          <MetricsTopItems items={metrics.topItemsByValue} />
        </div>
      )}
    </div>
  );
}
