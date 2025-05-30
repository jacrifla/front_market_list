export default function MetricsTopItems({ items }) {
  return (
    <>
      <h5 className="text-primary">Top Itens por Valor Total:</h5>
      {items.length > 0 ? (
        <ul className="list-group">
          {items.map((item, i) => (
            <li className="list-group-item d-flex justify-content-between" key={item.itemName + i}>
              <span>{item.itemName}</span>
              <span className="badge bg-dark">R$ {Number(item.totalValue).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum item com valor relevante.</p>
      )}
    </>
  );
}
