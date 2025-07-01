import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function QuickAddModal({show, onHide, onSave, label}) {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSave(name.trim());
        setName('');
        onHide();
    };

    const handleClose = () => {
        setName('');
        onHide();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar {label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Nome do(a) {label}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={`Digite o nome do(a) ${label}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    )
}