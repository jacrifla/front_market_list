import { Button } from 'react-bootstrap';

export default function FloatingAddButton({ onClick, icon = 'plus' }) {
  return (
    <Button
      onClick={onClick}
      aria-label="Adicionar"
      variant="primary"
      className="rounded-circle floating-add-button"
    >
      <i className={`bi bi-${icon}`}></i>
    </Button>
  );
}