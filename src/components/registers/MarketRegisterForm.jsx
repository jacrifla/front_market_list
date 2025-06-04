import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import useMarketService from '../../hooks/useMarketService';
import useToastMessage from '../../hooks/useToastMessage';
import ConfirmModal from '../ConfirmModal';

export default function MarketRegisterForm() {
    const { showToast } = useToastMessage();
  const {
    createMarket,
    updateMarket,
    deleteMarket,
    fetchMarkets,
    markets,
    success,
    error,
    loading,
  } = useMarketService();

  const [marketName, setMarketName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(success, error);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  useEffect(() => {
    if (success) {
      setMarketName('');
      setEditingId(null);
    }
  }, [success]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    if (!id) {
      setEditingId(null);
      setMarketName('');
      return;
    }

    const parsedId = Number(id);
    const market = markets.find((b) => b.marketId === parsedId);

    if (market) {
      setEditingId(market.marketId);
      setMarketName(market.marketName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marketName.trim()) {
      showToast('O nome da marca é obrigatório', 'error');
      return;
    }

    if (editingId) {
      await updateMarket(editingId, marketName.trim());
    } else {
      await createMarket(marketName.trim());
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setMarketName('');
  };

  const confirmDelete = async () => {
    await deleteMarket(editingId);
    setShowConfirmModal(false);
    setEditingId(null);
    setMarketName('');
  };

  return (
    <>
      <Card className="shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            {editingId ? 'Editar Mercado' : 'Cadastrar Mercado'}
          </h4>
          {editingId && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              disabled={loading}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Selecionar Mercado para Editar</label>
          <select
            className="form-select"
            value={editingId || ''}
            onChange={handleSelectChange}
            disabled={loading}
          >
            <option value="">-- Nova Mercado --</option>
            {markets?.map((b) => (
              <option key={b.marketId} value={b.marketId}>
                {b.marketName}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome da Mercado</label>
            <input
              type="text"
              className="form-control"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            {editingId && (
              <Button variant="secondary" onClick={cancelEditing}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="success" disabled={loading}>
              {loading
                ? editingId
                  ? 'Atualizando...'
                  : 'Salvando...'
                : editingId
                ? 'Atualizar'
                : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => !loading && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Mercado"
        body="Tem certeza que deseja excluir esta marca? Esta ação não poderá ser desfeita."
        confirmText={loading ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
