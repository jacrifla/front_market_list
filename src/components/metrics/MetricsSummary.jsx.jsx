import { ListGroup } from "react-bootstrap";

export default function MetricsSummary({ totalSpent, avgSpend, largestPurchase, avgDailySpend }) {
   return (
    <>
      <h5 className="text-primary">Resumo:</h5>
      <ListGroup className="mb-3">
        <ListGroup.Item>💸 Total Gasto: R$ {totalSpent.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>📊 Gasto Médio por Compra: R$ {avgSpend.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>🛒 Maior Gasto com Item: R$ {largestPurchase.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>📅 Gasto Médio Diário: R$ {avgDailySpend.toFixed(2)}</ListGroup.Item>
      </ListGroup>
    </>
  );
}
