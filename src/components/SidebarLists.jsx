import { useEffect } from 'react';

export default function SidebarLists({
  lists,
  selectedListId,
  onSelectList,
  onAddList,
  onMarkPurchased,
  onEditList,
  onDeleteList,
  onShareList,
  show,
  onClose,
  loadingList,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [show]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${show ? 'show' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`sidebar-container ${show ? 'open' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-list-task fs-4 text-primary"></i>
            <h5 className="mb-0">Minhas Listas</h5>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={onAddList}
              title="Nova Lista"
              disabled={loadingList}
            >
              {loadingList ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              ) : (
                <i className="bi bi-plus-lg"></i>
              )}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onClose}
              title="Fechar"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        <div
          className="list-items px-3 py-2 overflow-auto"
          style={{ maxHeight: 'calc(100vh - 60px)' }}
        >
          {lists.map((list) => {
            const isSelected = list.listId === selectedListId;
            return (
              <div
                key={list.listId}
                className={`list-item btn w-100 mb-3 text-start ${
                  isSelected ? 'active' : ''
                } ${
                  list.completedAt
                    ? 'bg-success bg-opacity-25 border-success'
                    : 'btn-light'
                }`}
                style={{ padding: '0.75rem' }}
              >
                {/* Nome e Data lado a lado */}
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onSelectList(list.listId);
                    onClose();
                  }}
                >
                  <strong
                    className="text-truncate me-3"
                    title={list.listName}
                    style={{ flex: 1 }}
                  >
                    {list.listName}
                  </strong>
                  <small className="text-muted flex-shrink-0">
                    {formatDate(list.createdAt || list.date || new Date())}
                  </small>
                </div>

                {/* Botões em linha ocupando toda largura, abaixo */}
                <div
                  className="btn-group btn-group-sm mt-2 w-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn btn-outline-success flex-fill"
                    title={
                      list.completedAt ? 'Já comprada' : 'Marcar como comprada'
                    }
                    onClick={() => onMarkPurchased(list.listId)}
                    disabled={!!list.completedAt}
                  >
                    <i
                      className={`bi ${
                        list.completedAt
                          ? 'bi-check-circle-fill'
                          : 'bi-check2-square'
                      }`}
                    ></i>
                  </button>
                  <button
                    className="btn btn-outline-warning flex-fill"
                    title="Editar lista"
                    onClick={() => onEditList(list)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger flex-fill"
                    title="Excluir lista"
                    onClick={() => onDeleteList(list.listId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-outline-info flex-fill"
                    title="Compartilhar lista"
                    onClick={() => onShareList(list.listId)}
                  >
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
