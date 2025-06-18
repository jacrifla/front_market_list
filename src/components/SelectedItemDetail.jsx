import { Card, Button, CloseButton, Stack } from 'react-bootstrap';

export default function SelectedItemDetails({ item, onClose, onMark, onEdit, onDelete }) {
  return (
    <Card
      border="primary"
      className="mb-3 position-relative"
      style={{ fontSize: '0.9rem' }}
    >
      <CloseButton
        aria-label="Fechar"
        onClick={onClose}
        className="position-absolute top-0 end-0 m-2"
      />

      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-between align-items-center flex-wrap"
        >
          <strong>{item.itemName}</strong>
          <div className="d-flex gap-3 pe-md-5" style={{ minWidth: '200px' }}>
            <span>Qtd: {item.quantity}</span>
            <span>Preço: R$ {item.price.toFixed(2)}</span>
            <span>Total: R$ {(item.quantity * item.price).toFixed(2)}</span>
          </div>
        </Stack>

        <Stack
          direction="horizontal"
          gap={2}
          className="mt-2 flex-wrap"
        >
          <Button size="sm" variant="success" onClick={onMark}>
            Marcar
          </Button>
          <Button size="sm" variant="warning" onClick={onEdit}>
            Editar
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Excluir
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
