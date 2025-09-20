import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function QuickAddModal({
  show,
  onHide,
  onSave,
  label,
  extraFields = [],
}) {
  const [formData, setFormData] = useState({
    name: '',
    ...extraFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
  });

  // Reset form quando o modal abre/fecha
 useEffect(() => {
  if (!show) {
    setFormData({
      name: '',
      ...extraFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
    });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [show]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    // Se não houver extraFields, envia só a string name
    if (extraFields.length === 0) {
      onSave(formData.name.trim());
    } else {
      // Caso contrário, envia o objeto completo
      onSave({
        ...formData,
        name: formData.name.trim(),
      });
    }

    // Reset form e fecha modal
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
