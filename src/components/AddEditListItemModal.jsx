import { Modal, Button, Form } from 'react-bootstrap';

export default function AddEditListItemModal({
  show,
  onHide,
  onConfirm,
  mode,
  formData,
  setFormData,
  suggestions,
  onItemNameChange,
  onSelectSuggestion,
  loadingListItem,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' ? 'Adicionar Item' : 'Editar Item'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Nome do Item</Form.Label>
            <Form.Control
              name="itemName"
              value={formData.itemName || ''}
              onChange={(e) => onItemNameChange(e.target.value)}
              autoComplete="off"
              aria-autocomplete="list"
              aria-haspopup="true"
              aria-expanded={Array.isArray(suggestions) && suggestions.length > 0}
              disabled={formData.itemType === 'common'}
            />
            {Array.isArray(suggestions) && suggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                {suggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className={`autocomplete-suggestion`}
                    onClick={() => onSelectSuggestion(sug)}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f8f9fa')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = 'white')
                    }
                  >
                    {sug.itemName}
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          disabled={
            !formData.itemName || formData.quantity <= 0 || loadingListItem
          }
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
