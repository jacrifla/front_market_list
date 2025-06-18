import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import useBrandService from '../../hooks/useBrandService';
import useToastMessage from '../../hooks/useToastMessage';
import ConfirmModal from '../ConfirmModal';

export default function BrandRegisterForm() {
  const { showToast } = useToastMessage();
  const {
    createBrand,
    updateBrand,
    deleteBrand,
    fetchBrands,
    brands,
    successBrand,
    errorBrand,
    loadingBrand,
  } = useBrandService();

  const [brandName, setBrandName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(successBrand, errorBrand);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (successBrand) {
      setBrandName('');
      setEditingId(null);
    }
  }, [successBrand]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    if (!id) {
      setEditingId(null);
      setBrandName('');
      return;
    }

    const parsedId = Number(id);
    const brand = brands.find((b) => b.brandId === parsedId);

    if (brand) {
      setEditingId(brand.brandId);
      setBrandName(brand.brandName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName.trim()) {
      showToast('O nome da marca é obrigatório', 'errorBrand');
      return;
    }

    if (editingId) {
      await updateBrand(editingId, brandName.trim());
    } else {
      await createBrand(brandName.trim());
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setBrandName('');
  };

  const confirmDelete = async () => {
    await deleteBrand(editingId);
    setShowConfirmModal(false);
    setEditingId(null);
    setBrandName('');
  };

  return (
    <>
      <Card className="shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            {editingId ? 'Editar Marca' : 'Cadastrar Marca'}
          </h4>
          {editingId && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              disabled={loadingBrand}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Selecionar Marca para Editar</Form.Label>
          <Form.Select
            value={editingId || ''}
            onChange={handleSelectChange}
            disabled={loadingBrand}
          >
            <option value="">-- Nova Marca --</option>
            {brands?.map((b) => (
              <option key={b.brandId} value={b.brandId}>
                {b.brandName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Marca</Form.Label>
            <Form.Control
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            {editingId && (
              <Button variant="secondary" onClick={cancelEditing}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="successBrand" disabled={loadingBrand}>
              {loadingBrand
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
        onHide={() => !loadingBrand && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Marca"
        body="Tem certeza que deseja excluir esta marca? Esta ação não poderá ser desfeita."
        confirmText={loadingBrand ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
