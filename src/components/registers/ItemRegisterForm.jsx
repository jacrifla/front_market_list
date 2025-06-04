import { useContext, useEffect, useRef, useState } from 'react';
import useBrandService from '../../hooks/useBrandService';
import useCategoryService from '../../hooks/useCategoryService';
import useItemService from '../../hooks/useItemService';
import useUnitService from '../../hooks/useUnitService';
import { Card } from 'react-bootstrap';
import useToastMessage from '../../hooks/useToastMessage';
import AutocompleteInput from './AutoCompleteInput';
import SelectField from './SelectField';
import { AuthContext } from '../../contexts/AuthContext';
import ConfirmModal from '../ConfirmModal';

const defaultFormData = {
  itemName: '',
  barcode: '',
  categoryId: '',
  brandId: '',
  unitId: '',
};

export default function ItemRegisterForm() {
  const { showToast } = useToastMessage();
  const { user } = useContext(AuthContext);
  const updatedBy = user?.userId;

  const {
    createItem,
    updateItem,
    deleteItem,
    fetchAllItems,
    items,
    success: itemSuccess,
    error: itemError,
    loading,
  } = useItemService();

  const {
    fetchCategorys,
    categories,
    error: categoryError,
  } = useCategoryService();

  const { fetchBrands, brands, error: brandError } = useBrandService();
  const { fetchUnits, units, error: unitError } = useUnitService();

  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const wrapperRef = useRef(null);

  const [formData, setFormData] = useState(defaultFormData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Unificar os toasts de erro e sucesso
  useEffect(() => {
    if (itemSuccess) showToast(itemSuccess, 'success');
    if (itemError) showToast(itemError, 'error');
    if (categoryError) showToast(categoryError, 'error');
    if (brandError) showToast(brandError, 'error');
    if (unitError) showToast(unitError, 'error');
  }, [itemSuccess, itemError, categoryError, brandError, unitError]);

  // Buscar dados no mount
  useEffect(() => {
    fetchCategorys();
    fetchBrands();
    fetchUnits();
    fetchAllItems();
  }, [fetchCategorys, fetchBrands, fetchUnits, fetchAllItems]);

  // Limpar sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resetar form ao salvar com sucesso
  useEffect(() => {
    if (itemSuccess) {
      setFormData(defaultFormData);
      setIsEditing(false);
      setEditingItemId(null);
      setSearchTerm('');
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  }, [itemSuccess]);

  // Filtrar sugestões
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const timeout = setTimeout(() => {
      const term = searchTerm.toLowerCase();
      const filtered = items.filter(
        (item) =>
          item.itemName.toLowerCase().includes(term) ||
          (item.barcode && item.barcode.includes(term))
      );
      setSuggestions(filtered);
      setHighlightedIndex(-1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, items]);

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItemId(null);
    setFormData(defaultFormData);
    setSearchTerm('');
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const startEditing = (item) => {
    setFormData({
      itemName: item.itemName || '',
      barcode: item.barcode || '',
      categoryId: item.categoryId || '',
      brandId: item.brandId || '',
      unitId: item.unitId || '',
    });
    setIsEditing(true);
    setEditingItemId(item.itemId);
    setSearchTerm('');
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : String(value),
    }));
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        startEditing(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.itemName.trim()) {
      showToast('O nome do produto é obrigatório', 'error');
      return;
    }

    const payload = {
      name: formData.itemName.trim(),
      barcode: formData.barcode?.trim() || null,
      categoryId: formData.categoryId ? Number(formData.categoryId) : null,
      brandId: formData.brandId ? Number(formData.brandId) : null,
      unitId: formData.unitId ? Number(formData.unitId) : null,
    };

    if (isEditing && editingItemId) {
      await updateItem(editingItemId, { ...payload, updatedBy });
    } else {
      await createItem(payload);
    }
  };

  const confirmDelete = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (editingItemId) {
      await deleteItem(editingItemId);
      cancelEdit();
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <Card className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Cadastrar Produto</h4>

          {isEditing && (
            <div className="d-flex">
              <button
                type="button"
                onClick={cancelEdit}
                aria-label="Cancelar edição"
                className="btn btn-outline-secondary btn-sm me-2 d-flex align-items-center"
              >
                <i className="bi bi-x-lg"></i>
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                aria-label="Deletar item"
                className="btn btn-danger btn-sm d-flex align-items-center"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>

        <AutocompleteInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={suggestions}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          startEditing={startEditing}
          wrapperRef={wrapperRef}
          suggestionsRef={suggestionsRef}
        />

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label">Nome do Produto</label>
              <input
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
                className="form-control"
                autoComplete="off"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Código de Barras</label>
              <input
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4 mb-3 mb-md-0">
              <SelectField
                label="Categoria"
                value={formData.categoryId}
                onChange={handleChange}
                name="categoryId"
                options={categories}
                getOptionValue={(opt) => String(opt.categoryId)}
                getOptionLabel={(opt) => opt.categoryName}
              />
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <SelectField
                label="Marca"
                value={formData.brandId}
                onChange={handleChange}
                name="brandId"
                options={brands}
                getOptionValue={(opt) => String(opt.brandId)}
                getOptionLabel={(opt) => opt.brandName}
              />
            </div>
            <div className="col-md-4">
              <SelectField
                label="Unidade de Medida"
                value={formData.unitId}
                onChange={handleChange}
                name="unitId"
                options={units}
                getOptionValue={(opt) => String(opt.unitId)}
                getOptionLabel={(opt) => opt.unitName}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading
                ? isEditing
                  ? 'Atualizando...'
                  : 'Salvando...'
                : isEditing
                ? 'Atualizar'
                : 'Salvar'}
            </button>
          </div>
        </form>
      </Card>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        body="Tem certeza que deseja apagar este item? Esta ação não pode ser desfeita."
        confirmText="Apagar"
        cancelText="Cancelar"
        confirmLoading={loading}
      />
    </>
  );
}
