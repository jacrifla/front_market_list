import { Modal, Button } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

export default function ConfirmModal({
  show,
  onHide,
  onConfirm,
  title,
  body,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  extraButton,
  confirmLoading = false,
  showConfirmButton = true,
  confirmDisabled = false,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className="d-flex align-items-center">
          <ExclamationTriangleFill className="text-warning me-2 fs-4" />
          <span>{title}</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2 fs-6 text-secondary">{body}</Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          className="flex-fill"
          disabled={confirmLoading}
        >
          {cancelText}
        </Button>

        {extraButton && (
          <Button
            variant={extraButton.variant || 'info'}
            onClick={extraButton.onClick}
            className="flex-fill"
            disabled={confirmLoading}
          >
            {extraButton.label}
          </Button>
        )}

        {showConfirmButton && (
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-fill"
            disabled={confirmLoading || confirmDisabled}
          >
            {confirmLoading ? 'Processando...' : confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
