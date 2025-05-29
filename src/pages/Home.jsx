import { useContext, useEffect } from 'react';
import SidebarLists from '../components/SidebarLists';
import FloatingAddButton from '../components/FloatingAddButton';
import ListHeader from '../components/ListHeader';
import { AuthContext } from '../contexts/AuthContext';
import ItemCard from '../components/ItemCard';
import SelectedItemDetails from '../components/SelectedItemDetail';
import useHomeLogic from '../hooks/useHomeLogic';
import AddEditListModal from '../components/AddEditListModal';
import ShareListModal from '../components/ShareListModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditListItemModal from '../components/AddEditListItemModal';

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
    success,
    total,
    handleSelectList,
    handleAddList,
    handleEditList,
    handleDeleteList,
    handleMarkAsBought,
    handleDeleteItem,
    setIsSidebarOpen,
    setSelectedItem,
    isModalOpen,
    setIsModalOpen,
    modalInputValue,
    setModalInputValue,
    handleModalConfirm,
    modalMode,
    handleShareList,
    shareToken,
    isShareModalOpen,
    setIsShareModalOpen,
    isItemModalOpen,
    setIsItemModalOpen,
    itemModalMode,
    itemFormData,
    setItemFormData,
    openAddItemModal,
    openEditItemModal,
    handleItemModalConfirm,
    suggestions,
    handleItemNameChange,
    handleSelectSuggestion,
  } = useHomeLogic(userId);  

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(success);
  }, [success]);

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
        // onMarkPurchased={}
        onEditList={handleEditList}
        onDeleteList={handleDeleteList}
        onShareList={handleShareList}
        show={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="pt-4 px-3">
        {loading && <p>Carregando...</p>}

        <ListHeader listName={selectedList?.listName} total={total} />

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
                onEdit={openEditItemModal}
                onDelete={handleDeleteItem}
              />
            )}

            <FloatingAddButton onClick={openAddItemModal} />
          </>
        ) : (
          <p className="text-muted">
            Selecione uma lista usando o botão no canto.
          </p>
        )}
      </main>

      <AddEditListModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        inputValue={modalInputValue}
        setInputValue={setModalInputValue}
        mode={modalMode}
        loading={loading}
      />

      <AddEditListItemModal
        show={isItemModalOpen}
        onHide={() => setIsItemModalOpen(false)}
        onConfirm={handleItemModalConfirm}
        mode={itemModalMode}
        formData={itemFormData}
        setFormData={setItemFormData}
        suggestions={suggestions}
        onItemNameChange={handleItemNameChange}
        onSelectSuggestion={handleSelectSuggestion}
      />

      <ShareListModal
        show={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        token={shareToken}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}
