export default function MetricsSummary({ totalSpent, avgSpend, largestPurchase, avgDailySpend }) {
  return (
    <>
      <h5 className="text-primary">Resumo:</h5>
      <ul className="list-group mb-3">
        <li className="list-group-item">💸 Total Gasto: R$ {totalSpent.toFixed(2)}</li>
        <li className="list-group-item">📊 Gasto Médio por Compra: R$ {avgSpend.toFixed(2)}</li>
        <li className="list-group-item">🛒 Maior Compra: R$ {largestPurchase.toFixed(2)}</li>
        <li className="list-group-item">📅 Gasto Médio Diário: R$ {avgDailySpend.toFixed(2)}</li>
      </ul>
    </>
  );
}
