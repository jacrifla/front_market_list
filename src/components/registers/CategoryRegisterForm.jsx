import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import useCategoryService from '../../hooks/useCategoryService';
import useToastMessage from '../../hooks/useToastMessage';
import ConfirmModal from '../ConfirmModal';

export default function CategoryRegisterForm() {
  const {
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategorys,
    loading,
    categories,
    success,
    error,
  } = useCategoryService();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(success, error);

  useEffect(() => {
    fetchCategorys();
  }, [fetchCategorys]);

  useEffect(() => {
    if (success) {
      setCategoryName('');
      setDescription('');
      setEditingId(null);
    }
  }, [success]);

  const handleSelectChange = (e) => {
    const id = e.target.value;

    if (!id) {
      setEditingId(null);
      setCategoryName('');
      setDescription('');
      return;
    }

    const parsedId = Number(id);

    const category = categories.find((c) => c.categoryId === parsedId);
    if (category) {
      setEditingId(category.categoryId);
      setCategoryName(category.categoryName || '');
      setDescription(category.description || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert('O nome da categoria é obrigatório');
      return;
    }

    const categoryData = {
      categoryName: categoryName.trim(),
      description: description.trim(),
    };

    if (editingId) {
      await updateCategory(editingId, categoryData);
    } else {
      await createCategory(categoryData);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setCategoryName('');
    setDescription('');
  };

  const confirmDelete = async () => {
    await deleteCategory(editingId);
    setShowConfirmModal(false);
    setEditingId(null);
    setCategoryName('');
  };

  return (
    <>
      <Card className="shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-4">
            {editingId ? 'Editar Categoria' : 'Cadastrar Categoria'}
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
          <label className="form-label">Selecionar Categoria para Editar</label>
          <select
            className="form-select"
            value={editingId || ''}
            onChange={handleSelectChange}
          >
            <option value="">-- Nova Categoria --</option>
            {categories?.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome da Categoria</label>
            <input
              type="text"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição (opcional)</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            {editingId && (
              <Button variant="secondary" onClick={cancelEditing}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="success">
              {editingId ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => !loading && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Categoria"
        body="Tem certeza que deseja excluir esta categoria? Esta ação não poderá ser desfeita."
        confirmText={loading ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
