import { useEffect, useState } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions, show]);

  const handleKeyDown = (e) => {
    if (!suggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      onSelectSuggestion(suggestions[highlightedIndex]);
    }
  };

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
              onKeyDown={handleKeyDown}
              autoComplete="off"
              aria-autocomplete="list"
              aria-haspopup="true"
              aria-expanded={
                Array.isArray(suggestions) && suggestions.length > 0
              }
              disabled={formData.itemType === 'common'}
            />
            {Array.isArray(suggestions) && suggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                {suggestions.map((sug, idx) => (
                  <div
                    key={idx}
                    className={`autocomplete-suggestion ${
                      idx === highlightedIndex ? 'active' : ''
                    }`}
                    onClick={() => onSelectSuggestion(sug)}
                    onMouseOver={() => setHighlightedIndex(idx)}
                    onMouseOut={() => setHighlightedIndex(-1)}
                  >
                    {sug.itemName}
                    {sug.barcode && ` (${sug.barcode})`}
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
          {loadingListItem ? 'Salvando...' : 'Salvar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
