import { Badge, ListGroup } from "react-bootstrap";

export default function MetricsTopItems({ items }) {
  return (
    <>
      <h5 className="text-primary">Top Itens por Valor Total:</h5>
      {items.length > 0 ? (
        <ListGroup>
          {items.map((item, i) => (
            <ListGroup.Item key={item.itemName + i} className="d-flex justify-content-between">
              <span>{item.itemName}</span>
              <Badge bg="dark">R$ {Number(item.totalValue).toFixed(2)}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Nenhum item com valor relevante.</p>
      )}
    </>
  );
}
