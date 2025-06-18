import { useEffect } from 'react';
import { Button, ListGroup, ButtonGroup } from 'react-bootstrap';

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
    document.body.style.overflow = show ? 'hidden' : '';
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
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1040,
          display: show ? 'block' : 'none',
        }}
      />

      {/* Sidebar */}
      <div
        className={`sidebar-container ${show ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: show ? 0 : '-320px',
          width: '320px',
          height: '100vh',
          backgroundColor: '#fff',
          boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
          transition: 'left 0.3s ease',
          zIndex: 1050,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-list-task fs-4 text-primary"></i>
            <h5 className="mb-0">Minhas Listas</h5>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onAddList}
              title="Nova Lista"
              disabled={loadingList}
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onClose}
              title="Fechar"
            >
              <i className="bi bi-x-lg"></i>
            </Button>
          </div>
        </div>

        <ListGroup
          className="flex-grow-1 px-3 py-2 overflow-auto"
          style={{ maxHeight: 'calc(100vh - 60px)' }}
        >
          {lists.map((list) => {
            const isSelected = list.listId === selectedListId;
            const isCompleted = !!list.completedAt;

            return (
              <ListGroup.Item
                key={list.listId}
                as="div"
                active={isSelected}
                variant={isCompleted ? 'success' : undefined}
                className="mb-3"
                style={{ padding: '0.75rem', cursor: 'pointer' }}
                onClick={() => {
                  onSelectList(list.listId);
                  onClose();
                }}
                title={list.listName}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="text-truncate me-3" style={{ flex: 1 }}>
                    {list.listName}
                  </strong>
                  <small className="text-muted flex-shrink-0">
                    {formatDate(list.createdAt || list.date || new Date())}
                  </small>
                </div>

                <ButtonGroup
                  size="sm"
                  className="mt-2 w-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    variant={isCompleted ? 'success' : 'outline-success'}
                    className="flex-fill"
                    title={isCompleted ? 'Já comprada' : 'Marcar como comprada'}
                    onClick={() => onMarkPurchased(list.listId)}
                    disabled={isCompleted || loadingList}
                  >
                    <i
                      className={`bi ${
                        isCompleted
                          ? 'bi-check-circle-fill'
                          : 'bi-check2-square'
                      }`}
                    />
                  </Button>
                  <Button
                    variant="outline-warning"
                    className="flex-fill"
                    title="Editar lista"
                    onClick={() => onEditList(list)}
                    disabled={loadingList}
                  >
                    <i className="bi bi-pencil" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="flex-fill"
                    title="Excluir lista"
                    onClick={() => onDeleteList(list.listId)}
                    disabled={loadingList}
                  >
                    <i className="bi bi-trash" />
                  </Button>
                  <Button
                    variant="outline-info"
                    className="flex-fill"
                    title="Compartilhar lista"
                    onClick={() => onShareList(list.listId)}
                    disabled={loadingList}
                  >
                    <i className="bi bi-share" />
                  </Button>
                </ButtonGroup>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
}
