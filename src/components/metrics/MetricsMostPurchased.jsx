export default function MetricsMostPurchased({ items }) {
  return (
    <>
      <h5 className="text-primary">Mais Comprados:</h5>
      {items.length > 0 ? (
        <ul className="list-group mb-3">
          {items.map((item, i) => (
            <li className="list-group-item d-flex justify-content-between" key={item.itemName + i}>
              <span>{item.itemName}</span>
              <span className="badge bg-secondary">{item.totalQuantity}x</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum item comprado nesse período.</p>
      )}
    </>
  );
}
