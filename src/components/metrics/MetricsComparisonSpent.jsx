import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import usePurchaseService from '../../hooks/usePurchaseService';

export default function MetricsComparisonSpent({
  startDate,
  endDate,
  showToast,
}) {
  const { getComparisonSpent } = usePurchaseService();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [items, total] = await getComparisonSpent(
          startDate,
          endDate,
          page,
          limit
        );
        setData(items);
        setTotalCount(total);
      } catch (err) {
        console.error(err);
        showToast('Erro ao buscar variações de preço.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, page, limit, getComparisonSpent, showToast]);

  const handlePageChange = (newPage) => setPage(newPage);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="mt-4">
      <h5 className="text-primary">Variação de Preços dos Itens</h5>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th className="text-center px-3 min-width-150 align-middle">
                  Item
                </th>
                <th className="text-center px-3 min-width-100 align-middle">
                  Preço Mínimo
                </th>
                <th className="text-center px-3 min-width-130 align-middle">
                  Data
                </th>
                <th className="text-center px-3 min-width-100 align-middle">
                  Mercado
                </th>
                <th className="text-center px-3 min-width-100 align-middle">
                  Preço Máximo
                </th>
                <th className="text-center px-3 min-width-130 align-middle">
                  Data
                </th>
                <th className="text-center px-3 min-width-100 align-middle">
                  Mercado
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-3 align-middle">{row.itemName}</td>
                  <td className="text-center px-3 align-middle">
                    R$ {row.minPrice}
                  </td>
                  <td className="text-center px-3 align-middle">
                    {formatDate(row.minPriceDate)}
                  </td>
                  <td className="px-3 align-middle">{row.minPriceMarket}</td>
                  <td className="text-center px-3 align-middle">
                    R$ {row.maxPrice}
                  </td>
                  <td className="text-center px-3 align-middle">
                    {formatDate(row.maxPriceDate)}
                  </td>
                  <td className="px-3 align-middle">{row.maxPriceMarket}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.Prev
                onClick={() => page > 1 && handlePageChange(page - 1)}
                disabled={page === 1}
              />
              {[...Array(totalPages)].map((_, idx) => {
                const pageNumber = idx + 1;
                return (
                  <Pagination.Item
                    key={pageNumber}
                    active={page === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next
                onClick={() => page < totalPages && handlePageChange(page + 1)}
                disabled={page === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
