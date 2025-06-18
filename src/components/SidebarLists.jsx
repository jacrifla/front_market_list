import { Offcanvas, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

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
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="start"
      backdrop="static"
      scroll
    >
      <Offcanvas.Header closeButton>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-list-task fs-4 text-primary"></i>
          <Offcanvas.Title className="mb-0">Minhas Listas</Offcanvas.Title>
        </div>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={onAddList}
          title="Nova Lista"
          disabled={loadingList}
          className="ms-2"
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
      </Offcanvas.Header>

      <Offcanvas.Body className="px-3 py-2">
        <ListGroup
          className="overflow-auto"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        >
          {lists.map((list) => {
            const isSelected = list.listId === selectedListId;
            const isCompleted = !!list.completedAt;

            return (
              <ListGroup.Item
                key={list.listId}
                as="div"
                variant={isCompleted ? 'success' : undefined}
                className={`mb-3 ${isSelected ? 'list-item-selected' : ''}`}
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
      </Offcanvas.Body>
    </Offcanvas>
  );
}
