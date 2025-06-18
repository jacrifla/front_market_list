import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import useToastMessage from '../hooks/useToastMessage';

export default function ShareListModal({ show, onClose, token }) {
  const shareUrl = token;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
  const {showToast} = useToastMessage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Link copiado para a área de transferência!', 'success');
    } catch {
      showToast('Erro ao copiar o link.', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Compartilhar Lista</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Compartilhe esse token para dar acesso à sua lista:</p>
        <InputGroup className="mb-3">
          <Form.Control value={shareUrl} readOnly />
          <Button variant="outline-secondary" onClick={handleCopy}>
            Copiar
          </Button>
        </InputGroup>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-end gap-2">
        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="success"
        >
          Enviar via WhatsApp
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
