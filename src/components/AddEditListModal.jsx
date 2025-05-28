import React from 'react';

export default function AddEditListModal({
  show,
  onClose,
  onConfirm,
  inputValue,
  setInputValue,
  mode, // 'add' ou 'edit'
  loading = false,
}) {
  if (!show) return null;

  const title = mode === 'add' ? 'Nova Lista' : 'Editar Lista';

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="modal-backdrop show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalLabel"
      >
        <div className="modal-dialog">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome da lista"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  required
                  disabled={loading}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || inputValue.trim() === ''}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
