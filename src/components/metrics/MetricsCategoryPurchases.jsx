import { Badge, ListGroup } from "react-bootstrap";

export default function MetricsCategoryPurchases({ categories }) {
  return (
    <>
      <h5 className="text-primary">Por Categoria:</h5>
      {categories.length > 0 ? (
        <ListGroup className="mb-3">
          {categories.map((cat, i) => (
            <ListGroup.Item key={cat.categoryName + i} className="d-flex justify-content-between">
              <span>{cat.categoryName}</span>
              <Badge bg="info">R$ {Number(cat.totalSpent).toFixed(2)}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Nenhuma compra por categoria nesse período.</p>
      )}
    </>
  );
}