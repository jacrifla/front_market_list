import SidebarLists from '../components/SidebarLists';
import FloatingAddButton from '../components/FloatingAddButton';
import ListHeader from '../components/ListHeader';
import { AuthContext } from '../contexts/AuthContext';
import ItemCard from '../components/ItemCard';
import SelectedItemDetails from '../components/SelectedItemDetail';
import useHomeLogic from '../hooks/useHomeLogic';
import AddEditListModal from '../components/AddEditListModal';
import ShareListModal from '../components/ShareListModal';
import 'react-toastify/dist/ReactToastify.css';
import AddEditListItemModal from '../components/AddEditListItemModal';
import ConfirmModal from '../components/ConfirmModal';
import ItemDetailsModal from '../components/ItemDetailsModal';
import PurchaseDateModal from '../components/PurchaseDateModal';
import useToastMessage from '../hooks/useToastMessage';
import React from 'react';

export default function Home() {
  const {
    selectedList,
    selectedListId,
    selectedItem,
    isSidebarOpen,
    lists,
    listItems,
    loading,
    errorList,
    errorItem,
    successList,
    successItem,
    total,
    handleSelectList,
    handleAddList,
    handleEditList,
    handleDeleteList,
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
    isConfirmSaveModalOpen,
    isSaveItemModalOpen,
    handleCancel,
    handleDontSave,
    handleConfirmSave,
    handleSubmitItemInfo,
    brands,
    categories,
    units,
    markets,
    isPurchaseDateModalOpen,
    handlePurchaseDateSelected,
    setIsPurchaseDateModalOpen,
    setPendingMarkAsBought,
    handleCheckItem,
    isConfirmDeleteModalOpen,
    handleCancelDelete,
    handleConfirmDelete,
    handleCompleteList,
    loadingList,
    loadingListItem,
  } = useHomeLogic();

  useToastMessage(null, errorList);
  useToastMessage(null, errorItem);
  useToastMessage(successList, null);
  useToastMessage(successItem, null);

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
        onMarkPurchased={handleCompleteList}
        onEditList={handleEditList}
        onDeleteList={handleDeleteList}
        onShareList={handleShareList}
        show={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        loadingList={loadingList}
      />

      <main className="pt-4 px-3">
        {loading && <p>Carregando...</p>}

        <ListHeader listName={selectedList?.listName} total={total} />

        {selectedListId ? (
          <>
            {listItems.map((item, index) => (
              <React.Fragment key={item.itemListId}>
                <ItemCard
                  item={item}
                  index={index}
                  selectedItem={selectedItem}
                  onSelect={setSelectedItem}
                />
                {selectedItem?.itemListId === item.itemListId && (
                  <SelectedItemDetails
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onMark={() => handleCheckItem(selectedItem)}
                    onEdit={openEditItemModal}
                    onDelete={handleDeleteItem}
                  />
                )}
              </React.Fragment>
            ))}

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
        loadingListItem={loadingListItem}
      />

      <ShareListModal
        show={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        token={shareToken}
      />

      <ConfirmModal
        show={isConfirmSaveModalOpen}
        onHide={handleCancel}
        onConfirm={handleConfirmSave}
        confirmText="Sim, salvar"
        cancelText="Cancelar"
        extraButton={{
          label: 'Não salvar',
          variant: 'secondary',
          onClick: handleDontSave,
        }}
        title="Salvar informações do item?"
        body="Deseja salvar os dados do item? Caso não, enviaremos os campos como nulos."
      />

      <ConfirmModal
        show={isConfirmDeleteModalOpen}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Deseja excluir a lista?"
        body="A lista foi marcada como comprada. Deseja excluí-la permanentemente?"
        confirmText="Sim, excluir"
        cancelText="Não"
      />

      <ItemDetailsModal
        show={isSaveItemModalOpen}
        onHide={handleCancel}
        onSave={handleSubmitItemInfo}
        item={selectedItem}
        brands={brands}
        categories={categories}
        units={units}
        markets={markets}
      />

      <PurchaseDateModal
        show={isPurchaseDateModalOpen}
        onClose={() => {
          setIsPurchaseDateModalOpen(false);
          setPendingMarkAsBought(null);
        }}
        onConfirm={handlePurchaseDateSelected}
      />
    </div>
  );
}
