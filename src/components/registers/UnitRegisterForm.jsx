import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import useUnitService from '../../hooks/useUnitService';
import useToastMessage from '../../hooks/useToastMessage';
import ConfirmModal from '../ConfirmModal';

export default function UnitRegisterForm() {
  const { showToast } = useToastMessage();
  const {
    createUnit,
    updateUnit,
    deleteUnit,
    fetchUnits,
    units,
    successUnit,
    errorUnit,
    loadingUnit,
  } = useUnitService();

  const [unitName, setUnitName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useToastMessage(successUnit, errorUnit);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  useEffect(() => {
    if (successUnit) {
      setUnitName('');
      setEditingId(null);
    }
  }, [successUnit]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    if (!id) {
      setEditingId(null);
      setUnitName('');
      return;
    }

    const parsedId = Number(id);
    const unit = units.find((b) => b.unitId === parsedId);

    if (unit) {
      setEditingId(unit.unitId);
      setUnitName(unit.unitName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedName = unitName.trim().toUpperCase();

    if (!formattedName) {
      showToast('O nome da unidade é obrigatório', 'errorUnit');
      return;
    }

    if (editingId) {
      await updateUnit(editingId, formattedName);
    } else {
      await createUnit(formattedName);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setUnitName('');
  };

  const confirmDelete = async () => {
    await deleteUnit(editingId);
    setShowConfirmModal(false);
    setEditingId(null);
    setUnitName('');
  };

  return (
    <>
      <Card className="shadow-sm p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            {editingId ? 'Editar Unidade' : 'Cadastrar Unidade'}
          </h4>
          {editingId && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              disabled={loadingUnit}
            >
              <i className="bi bi-trash"></i>
            </Button>
          )}
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">
            Selecionar Unidade para Editar
          </Form.Label>
          <Form.Select
            value={editingId || ''}
            onChange={handleSelectChange}
            disabled={loadingUnit}
          >
            <option value="">-- Nova Unidade --</option>
            {units?.map((b) => (
              <option key={b.unitId} value={b.unitId}>
                {b.unitName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Nome da Unidade</Form.Label>
            <Form.Control
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value.toUpperCase())}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            {editingId && (
              <Button variant="secondary" onClick={cancelEditing}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="successUnit" disabled={loadingUnit}>
              {loadingUnit
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
        onHide={() => !loadingUnit && setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Excluir Marca"
        body="Tem certeza que deseja excluir esta marca? Esta ação não poderá ser desfeita."
        confirmText={loadingUnit ? 'Excluindo...' : 'Excluir'}
        cancelText="Cancelar"
      />
    </>
  );
}
