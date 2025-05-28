export default function FloatingAddButton({ onClick, icon = 'plus' }) {
  return (
    <button
      onClick={onClick}
      aria-label="Adicionar"
      className="btn btn-primary rounded-circle floating-add-button"
    >
      <i className={`bi bi-${icon}`}></i>
    </button>
  );
}