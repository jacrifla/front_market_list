import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function QuickAddModal({  show, onHide, onSave, label, extraFields = []}) {
  const [formData, setFormData] = useState({
    name: '',
    ...extraFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSave(formData);
    setFormData({
      name: '',
      ...extraFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar {label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nome do(a) {label}</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        {extraFields.map((field) => (
          <Form.Group key={field.name} className="mt-2">
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
