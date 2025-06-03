import { useState, useCallback, useEffect, useContext } from 'react';
import useListService from '../hooks/useListService';
import useListItemService from '../hooks/useListItemService';
import useShareTokenService from './useShareTokenService';
import useItemService from './useItemService';
import useBrandService from './useBrandService';
import useCategoryService from './useCategoryService';
import useUnitService from './useUnitService';
import useMarketService from './useMarketService';
import { AuthContext } from '../contexts/AuthContext';

const useHomeLogic = () => {
    const { user } = useContext(AuthContext);
    const userId = user?.userId;

    const [total, setTotal] = useState(0);
    const [selectedListId, setSelectedListId] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const [purchaseDateByListId, setPurchaseDateByListId] = useState({});
    const [isPurchaseDateModalOpen, setIsPurchaseDateModalOpen] = useState(false);
    const [pendingMarkAsBought, setPendingMarkAsBought] = useState(null);


    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalInputValue, setModalInputValue] = useState('');

    const [shareToken, setShareToken] = useState(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const [suggestions, setSuggestions] = useState([]);

    const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
    const [isSaveItemModalOpen, setIsSaveItemModalOpen] = useState(false);

    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemModalMode, setItemModalMode] = useState('add');
    const [itemFormData, setItemFormData] = useState({
        itemName: '',
        quantity: 1,
        price: 0,
        itemType: 'common',
    });

    const { generateShareToken } = useShareTokenService();

    const {
        lists,
        createList,
        updateList,
        deleteList,
        markListCompleted,
        success: listSuccess,
        error: listError,
    } = useListService(userId);

    const {
        searchItemByBarcodeOrName,
        items: itemSuggestions
    } = useItemService();

    const {
        listItems,
        loading,
        error: itemError,
        success: itemSuccess,
        fetchItemsByListId,
        markItemAsBought,
        addListItem,
        updateListItem,
        deleteListItem,
    } = useListItemService();

    const {
        brands,
        fetchBrands,
        loading: loadingBrands,
    } = useBrandService();

    const {
        categories,
        fetchCategorys,
        loading: loadingCategories,
    } = useCategoryService();

    const {
        units,
        fetchUnits,
        loading: loadingUnits,
    } = useUnitService();

    const {
        markets,
        fetchMarkets,
        loading: loadingMarkets,
    } = useMarketService();

    useEffect(() => {
        fetchBrands();
        fetchCategorys();
        fetchUnits();
        fetchMarkets();
    }, [fetchBrands, fetchCategorys, fetchUnits, fetchMarkets]);

    const selectedList = lists.find((list) => list.listId === selectedListId) || null;

    useEffect(() => {
        const newTotal = listItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(newTotal);
    }, [listItems]);


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
        setItemFormData((prev) => ({
            ...prev,
            itemName: item.itemName,
            itemType: 'common',
            itemId: item.itemId,
        }));
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
            setTotal(0);
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

    const handleCompleteList = async (listId) => {
        await markListCompleted({
            listId,
            userId,
            totalAmount: total,
            purchaseDate: purchaseDateByListId[listId] || null
        });
        setSelectedListId(listId);
        setIsConfirmDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedListId) {
            await handleDeleteList(selectedListId);
            setSelectedListId(null);
            setIsConfirmDeleteModalOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setSelectedListId(null);
        setIsConfirmDeleteModalOpen(false);
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

    const handleCheckItem = (item) => {
        const listDate = purchaseDateByListId[item.listId];

        if (!listDate) {
            setPendingMarkAsBought(item);
            setIsPurchaseDateModalOpen(true);
            return;
        }

        handleMarkAsBoughtClick(item);
    };

    const handlePurchaseDateSelected = (date) => {
        if (!pendingMarkAsBought) return;

        setPurchaseDateByListId(prev => ({
            ...prev,
            [pendingMarkAsBought.listId]: date
        }));

        handleMarkAsBoughtClick(pendingMarkAsBought);

        setPendingMarkAsBought(null);
        setIsPurchaseDateModalOpen(false);
    };

    const handleMarkAsBoughtClick = useCallback((item) => {
        setSelectedItem(item);
        setIsConfirmSaveModalOpen(true);
    }, []);

    const handleCancel = () => {
        setSelectedItem(null);
        setIsConfirmSaveModalOpen(false);
        setIsSaveItemModalOpen(false);
    };

    const handleDontSave = async () => {
        if (!selectedItem) return;

        await markItemAsBought({
            userId,
            itemId: selectedItem.itemId,
            listId: selectedItem.listId,
            itemListId: selectedItem.itemListId,
            categoryId: null,
            brandId: null,
            unitId: null,
            marketId: null,
            barcode: null,
            purchaseDate: purchaseDateByListId[selectedItem.listId]
        });

        handleCancel();
    };

    const handleConfirmSave = () => {
        setIsConfirmSaveModalOpen(false);
        setIsSaveItemModalOpen(true);
    };

    const handleSubmitItemInfo = async (data) => {
        if (!selectedItem) return;

        await markItemAsBought({
            userId,
            itemId: selectedItem.itemId,
            listId: selectedItem.listId,
            itemListId: selectedItem.itemListId,
            categoryId: data.categoryId,
            brandId: data.brandId,
            unitId: data.unitId,
            marketId: data.marketId,
            barcode: data.barcode,
            purchaseDate: purchaseDateByListId[selectedItem.listId]
        });

        handleCancel();
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
        errorList: listError,
        errorItem: itemError,
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
        successList: listSuccess,
        successItem: itemSuccess,
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
        loadingBrands,
        categories,
        loadingCategories,
        units,
        loadingUnits,
        markets,
        loadingMarkets,

        isPurchaseDateModalOpen,
        handleCheckItem,
        handlePurchaseDateSelected,
        setIsPurchaseDateModalOpen,
        setPendingMarkAsBought,

        handleCompleteList,
        isConfirmDeleteModalOpen,
        handleConfirmDelete,
        handleCancelDelete,
    };
};

export default useHomeLogic;
