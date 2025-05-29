export default function SelectedItemDetails({
  item,
  onClose,
  onMark,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card mb-3 border-primary p-2 position-relative" style={{ fontSize: '0.9rem' }}>
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Fechar"
        onClick={onClose}
      ></button>

      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <strong>{item.itemName}</strong>
        <div className="d-flex gap-3 pe-md-5" style={{ minWidth: '200px' }}>
          <span>Qtd: {item.quantity}</span>
          <span>Preço: R$ {item.price.toFixed(2)}</span>
          <span>Total: R$ {(item.quantity * item.price).toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-2 mt-2 flex-wrap">
        <button className="btn btn-sm btn-success" onClick={onMark}>Marcar</button>
        <button className="btn btn-sm btn-warning" onClick={onEdit}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>Excluir</button>
      </div>
    </div>
  );
}
