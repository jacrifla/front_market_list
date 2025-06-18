import { Modal, Button, Form } from 'react-bootstrap';

export default function AddEditListModal({
  show,
  onClose,
  onConfirm,
  inputValue,
  setInputValue,
  mode,
  loading = false,
}) {
  const title = mode === 'add' ? 'Nova Lista' : 'Editar Lista';

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={!loading}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Digite o nome da lista"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            required
            disabled={loading}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading || inputValue.trim() === ''}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
