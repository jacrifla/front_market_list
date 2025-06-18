import { Badge, ListGroup } from "react-bootstrap";

export default function MetricsMostPurchased({ items }) {
  return (
    <>
      <h5 className="text-primary">Mais Comprados:</h5>
      {items.length > 0 ? (
        <ListGroup className="mb-3">
          {items.map((item, i) => (
            <ListGroup.Item key={item.itemName + i} className="d-flex justify-content-between">
              <span>{item.itemName}</span>
              <Badge bg="secondary">{item.totalQuantity}x</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Nenhum item comprado nesse período.</p>
      )}
    </>
  );
}
