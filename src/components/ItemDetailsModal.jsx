import { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import QuickAddModal from './QuickAddModal'; // ajuste o caminho conforme necessário

export default function ItemDetailsModal({
  show,
  onHide,
  onSave,
  item,
  brands = [],
  categories = [],
  units = [],
  markets = [],
  onAddBrand,
  onAddCategory,
  onAddUnit,
  onAddMarket,
}) {
  const [formData, setFormData] = useState({
    brandId: '',
    categoryId: '',
    unitId: '',
    barcode: '',
    marketId: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddMarket, setShowAddMarket] = useState(false);
  
  useEffect(() => {
    if (show && item) {
      setFormData({
        brandId: item.brandId || '',
        categoryId: item.categoryId || '',
        unitId: item.unitId || '',
        barcode: item.barcode || '',
        marketId: item.marketId || '',
      });
      setIsSaving(false);
    }
  }, [show, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave({
        ...formData,
        brandId: formData.brandId || null,
        categoryId: formData.categoryId || null,
        unitId: formData.unitId || null,
        barcode: formData.barcode || null,
        marketId: formData.marketId || null,
      });
      onHide();
    } catch (err) {
      console.error('Erro ao salvar item:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do item:{' '}
            <strong>{item?.itemName || 'Item desconhecido'}</strong>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Categoria</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="flex-grow-1"
                >
                  <option value="">Selecione</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAddCategory(true)}
                >
                  +
                </Button>
              </div>

              {formData.categoryId && (
                <Form.Text className="text-muted mt-1 d-block">
                  {categories.find(
                    (cat) =>
                      String(cat.categoryId) === String(formData.categoryId)
                  )?.description || 'Sem descrição disponível.'}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className="flex-grow-1"
                >
                  <option value="">Selecione</option>
                  {brands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAddBrand(true)}
                >
                  +
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unidade de medida</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Select
                  name="unitId"
                  value={formData.unitId}
                  onChange={handleChange}
                  className="flex-grow-1"
                >
                  <option value="">Selecione</option>
                  {units.map((unit) => (
                    <option key={unit.unitId} value={unit.unitId}>
                      {unit.unitName}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAddUnit(true)}
                >
                  +
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Código de barras</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder="Digite ou escaneie"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mercado</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Select
                  name="marketId"
                  value={formData.marketId}
                  onChange={handleChange}
                  className="flex-grow-1"
                >
                  <option value="">Selecione</option>
                  {markets.map((market) => (
                    <option key={market.marketId} value={market.marketId}>
                      {market.marketName}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAddMarket(true)}
                >
                  +
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner
                  as="span"
                  size='sm'
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />{' '}
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modais de criação rápida */}
      <QuickAddModal
        show={showAddBrand}
        onHide={() => setShowAddBrand(false)}
        onSave={onAddBrand}
        label="marca"
      />

      <QuickAddModal
        show={showAddCategory}
        onHide={() => setShowAddCategory(false)}
        onSave={onAddCategory}
        label="categoria"
      />

      <QuickAddModal
        show={showAddUnit}
        onHide={() => setShowAddUnit(false)}
        onSave={onAddUnit}
        label="unidade"
      />

      <QuickAddModal
        show={showAddMarket}
        onHide={() => setShowAddMarket(false)}
        onSave={onAddMarket}
        label="mercado"
      />
    </>
  );
}
