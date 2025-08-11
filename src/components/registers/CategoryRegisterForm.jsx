import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import useCategoryService from '../../hooks/useCategoryService';
import useToastMessage from '../../hooks/useToastMessage';
import ConfirmModal from '../ConfirmModal';

export default function CategoryRegisterForm() {
  const {
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategorys,
    loadingCategory,
    categories,
    successCategory,
    errorCategory,
  } = useCategoryService();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(successCategory, errorCategory);

  useEffect(() => {
    fetchCategorys();
  }, [fetchCategorys]);

  useEffect(() => {
    if (successCategory) {
      setCategoryName('');
      setDescription('');
      setEditingId(null);
    }
  }, [successCategory]);

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
      name: categoryName.trim(),
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
              disabled={loadingCategory}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Selecionar Categoria para Editar</Form.Label>
          <Form.Select
            value={editingId || ''}
            onChange={handleSelectChange}
            disabled={loadingCategory}
          >
            <option value="">-- Nova Categoria --</option>
            {categories?.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Nome da Categoria</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label">Descrição (opcional)</Form.Label>
            <Form.Control
              as={'textarea'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
            />
          </Form.Group>

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
        onHide={() => !loadingCategory && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Categoria"
        body="Tem certeza que deseja excluir esta categoria? Esta ação não poderá ser desfeita."
        confirmText={loadingCategory ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
