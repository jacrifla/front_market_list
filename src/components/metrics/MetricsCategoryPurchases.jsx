export default function MetricsCategoryPurchases({ categories }) {
  return (
    <>
      <h5 className="text-primary">Por Categoria:</h5>
      {categories.length > 0 ? (
        <ul className="list-group mb-3">
          {categories.map((cat, i) => (
            <li className="list-group-item d-flex justify-content-between" key={cat.categoryName + i}>
              <span>{cat.categoryName}</span>
              <span className="badge bg-info">R$ {Number(cat.totalSpent).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma compra por categoria nesse período.</p>
      )}
    </>
  );
}
