import { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
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
    successMarket,
    errorMarket,
    loadingMarket,
  } = useMarketService();

  const [marketName, setMarketName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(successMarket, errorMarket);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  useEffect(() => {
    if (successMarket) {
      setMarketName('');
      setEditingId(null);
    }
  }, [successMarket]);

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
      showToast('O nome do mercado é obrigatório', 'errorMarket');
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
              disabled={loadingMarket}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Selecionar Mercado para Editar</Form.Label>
            <Form.Select
              value={editingId || ''}
              onChange={handleSelectChange}
              disabled={loadingMarket}
            >
              <option value="">-- Novo Mercado --</option>
              {markets?.map((b) => (
                <option key={b.marketId} value={b.marketId}>
                  {b.marketName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nome do Mercado</Form.Label>
            <Form.Control
              type="text"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
              placeholder="Digite o nome do mercado"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            {editingId && (
              <Button variant="secondary" onClick={cancelEditing}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="successMarket" disabled={loadingMarket}>
              {loadingMarket
                ? editingId
                  ? 'Atualizando...'
                  : 'Salvando...'
                : editingId
                ? 'Atualizar'
                : 'Salvar'}
            </Button>
          </div>
        </Form>
      </Card>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => !loadingMarket && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Mercado"
        body="Tem certeza que deseja excluir este mercado? Esta ação não poderá ser desfeita."
        confirmText={loadingMarket ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
