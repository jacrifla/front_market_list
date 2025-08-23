import { Badge, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function MetricsMostPurchased({ items, meta, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Atualiza currentPage sempre que meta.page mudar
  useEffect(() => {
    if (meta?.page) setCurrentPage(meta.page);
  }, [meta?.page]);

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (meta && currentPage < meta.totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <>
      <h5 className="text-primary">Mais Comprados:</h5>
      {items.length > 0 ? (
        <>
          <ListGroup className="mb-2">
            {items.map((item, i) => (
              <ListGroup.Item
                key={item.itemName + i}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{item.itemName}</span>
                <span className="d-flex gap-2">
                  <Badge bg="secondary">{item.totalQuantity}x</Badge>
                  <span>R$ {item.totalSpent.toFixed(2)}</span>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="d-flex justify-content-between mb-3">
            <Button size="sm" onClick={handlePrev} disabled={currentPage <= 1}>
              ← Anterior
            </Button>
            <span>
              Página {currentPage} de {meta?.totalPages || 1}
            </span>
            <Button
              size="sm"
              onClick={handleNext}
              disabled={!meta || currentPage >= meta.totalPages}
            >
              Próxima →
            </Button>
          </div>
        </>
      ) : (
        <p>Nenhum item comprado nesse período.</p>
      )}
    </>
  );
}
