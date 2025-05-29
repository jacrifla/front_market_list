import { useState, useCallback } from 'react';
import useListService from '../hooks/useListService';
import useListItemService from '../hooks/useListItemService';
import useShareTokenService from './useShareTokenService';
import useItemService from './useItemService';

const useHomeLogic = (userId) => {
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalInputValue, setModalInputValue] = useState('');

    const [shareToken, setShareToken] = useState(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [suggestions, setSuggestions] = useState([]);


    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemModalMode, setItemModalMode] = useState('add');
    const [itemFormData, setItemFormData] = useState({
        itemName: '',
        quantity: 1,
        price: 0,
        itemType: 'common',
    });

    const { lists, createList, updateList, deleteList, success } = useListService(userId);
    const { generateShareToken } = useShareTokenService();
    const {
        searchItemByBarcodeOrName,
        items: itemSuggestions
    } = useItemService();

    const {
        listItems,
        loading,
        error,
        fetchItemsByListId,
        markItemAsBought,
        addListItem,
        updateListItem,
        deleteListItem,
    } = useListItemService();

    const selectedList = lists.find((list) => list.listId === selectedListId) || null;

    const total = listItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const handleItemNameChange = async (name) => {
        if (itemFormData.itemType === 'common') return;
        setItemFormData((prev) => ({
            ...prev,
            itemName: name,
            itemType: 'custom',
            itemId: null,
        }));

        if (name.length >= 1) {
            await searchItemByBarcodeOrName(name);
            setSuggestions(itemSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (item) => {
        setItemFormData({
            itemName: item.itemName,
            itemType: 'common',
            itemId: item.itemId,
        });
        setSuggestions([]);
    };


    // Listas
    const handleSelectList = useCallback(async (listId) => {
        setSelectedListId(listId);
        await fetchItemsByListId(listId);
        setSelectedItem(null);
        setIsSidebarOpen(false);
    }, [fetchItemsByListId]);

    const handleAddList = () => {
        setModalMode('add');
        setModalInputValue('');
        setIsModalOpen(true);
    };

    const handleEditList = (list) => {
        setModalMode('edit');
        setModalInputValue(list.listName);
        setSelectedListId(list.listId);
        setIsModalOpen(true);
    };

    const handleModalConfirm = async () => {
        if (!modalInputValue.trim()) return;

        if (modalMode === 'add') {
            const nova = await createList(modalInputValue.trim());
            if (nova?.listId) {
                setSelectedListId(nova.listId);
            }
        } else if (modalMode === 'edit') {
            await updateList(selectedListId, { listName: modalInputValue.trim() });

        }
        setIsModalOpen(false);
    };

    const handleDeleteList = async (listId) => {
        await deleteList(listId);
        if (selectedListId === listId) {
            setSelectedListId(null);
            setSelectedItem(null);
        }
    };

    const handleShareList = async (listId) => {
        try {
            const token = await generateShareToken(listId);
            if (token?.token) {
                setShareToken(token.token);
                setIsShareModalOpen(true);
            } else {
                alert('Erro ao gerar token de compartilhamento.');
            }
        } catch (error) {
            console.error('Erro ao compartilhar lista:', error);
            alert('Erro ao compartilhar a lista.');
        }
    };


    //   Item
    const openAddItemModal = () => {
        setItemModalMode('add');
        setItemFormData({ itemName: '', quantity: 1, price: 0, itemType: 'custom', itemId: null });
        setIsItemModalOpen(true);
    };

    const openEditItemModal = () => {
        if (!selectedItem) return;

        const normalizedItemType = selectedItem.itemType === 'common' ? 'common' : 'custom';

        setItemModalMode('edit');
        setItemFormData({
            itemName: selectedItem.itemName,
            quantity: selectedItem.quantity,
            price: selectedItem.price,
            itemType: normalizedItemType,
            itemId: selectedItem.itemId || null,
            itemListId: selectedItem.itemListId,
        });

        setIsItemModalOpen(true);
    };

    const handleItemModalConfirm = async () => {
        const { itemName, quantity, price, itemType, itemId } = itemFormData;

        if (!itemName.trim()) return;

        const payload = {
            listId: selectedListId,
            itemName: itemName.trim(),
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            itemType,
        };

        if (itemType === 'common' && itemId) {
            payload.itemId = itemId;
        }

        if (itemModalMode === 'add') {
            await addListItem(payload);
        } else if (itemModalMode === 'edit') {
            await updateListItem(selectedItem.itemListId, {
                itemName: itemName.trim(),
                quantity: parseFloat(quantity),
                price: parseFloat(price),
            });
        }

        setIsItemModalOpen(false);
        setSelectedItem(null);
        await fetchItemsByListId(selectedListId);
    };

    const handleMarkAsBought = async () => {
        if (!selectedItem) return;
        await markItemAsBought({
            listId: selectedListId,
            itemListId: selectedItem.itemListId,
        });
        setSelectedItem(null);
    };

    const handleDeleteItem = async () => {
        if (!selectedItem) return;
        await deleteListItem(selectedItem.itemListId, selectedListId);
        setSelectedItem(null);
    };


    return {
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
        success,

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
    };
};

export default useHomeLogic;
