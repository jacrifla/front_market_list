import { useContext } from 'react';
import SidebarLists from '../components/SidebarLists';
import FloatingAddButton from '../components/FloatingAddButton';
import ListHeader from '../components/ListHeader';
import { AuthContext } from '../contexts/AuthContext';
import ItemCard from '../components/ItemCard';
import SelectedItemDetails from '../components/SelectedItemDetail';
import useHomeLogic from '../hooks/useHomeLogic';

export default function Home() {
  const { user } = useContext(AuthContext);
  const userId = user?.userId;

  const {
    selectedList,
    selectedListId,
    selectedItem,
    isSidebarOpen,
    lists,
    listItems,
    loading,
    error,
    total,
    handleSelectList,
    handleAddItem,
    handleMarkAsBought,
    handleEditItem,
    handleDeleteItem,
    handleAddList,
    setIsSidebarOpen,
    setSelectedItem,
  } = useHomeLogic(userId);

  return (
    <div className="container-fluid">
      <button
        className="btn btn-dark fixed-sidebar-btn"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Abrir listas"
      >
        <i className="bi bi-list"></i>
      </button>

      <SidebarLists
        lists={lists}
        selectedListId={selectedListId}
        onSelectList={handleSelectList}
        onAddList={handleAddList}
        show={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-4 px-3">
        <ListHeader listName={selectedList?.name} total={total} />

        {loading && <p>Carregando...</p>}
        {error && <p className="text-danger">{error}</p>}

        {selectedListId ? (
          <>
            {listItems.map((item, index) => (
              <ItemCard
                key={item.itemListId}
                item={item}
                index={index}
                selectedItem={selectedItem}
                onSelect={setSelectedItem}
              />
            ))}

            {selectedItem && (
              <SelectedItemDetails
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onMark={handleMarkAsBought}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}

            <FloatingAddButton onClick={handleAddItem} />
          </>
        ) : (
          <p className="text-muted">Selecione uma lista usando o botão no canto.</p>
        )}
      </main>
    </div>
  );
}
