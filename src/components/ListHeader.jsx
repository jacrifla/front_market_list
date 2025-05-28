export default function ListHeader({ listName, total }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="mb-0 d-flex align-items-center gap-2">
        <i className="bi bi-basket3-fill"></i>
        {listName || 'Selecione uma lista'}
      </h4>
      <span className="fs-5 text-primary d-flex align-items-center gap-2">
        <i className="bi bi-receipt"></i>
        R$ {total.toFixed(2)}
      </span>
    </div>
  );
}
