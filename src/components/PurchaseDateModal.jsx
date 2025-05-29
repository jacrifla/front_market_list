import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PurchaseDateModal = ({ show, onClose, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        if (show) {
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
        }
    }, [show]);

    const handleConfirm = () => {
        if (selectedDate) {
            onConfirm(selectedDate);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton className='border-0'>
                <Modal.Title>Data da compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="purchaseDate">
                    <Form.Label>Quando você comprou o item?</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='border-0'>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PurchaseDateModal;
