import React from 'react';
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
  onSelectSuggestion
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData);
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'Adicionar Item' : 'Editar Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 position-relative">
            <Form.Label>Nome do Item</Form.Label>
            <Form.Control
              name="itemName"
              value={formData.itemName}
              onChange={(e) => onItemNameChange(e.target.value)}
              autoComplete="off"
              disabled={formData.itemType === 'common'}
            />
            {suggestions.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  width: '100%',
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}
              >
                {suggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectSuggestion(sug)}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                    }}
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
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={onConfirm}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
