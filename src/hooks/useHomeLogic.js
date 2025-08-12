import { useState, useCallback, useEffect } from 'react';
import useListService from '../hooks/useListService';
import useListItemService from '../hooks/useListItemService';
import useShareTokenService from './useShareTokenService';
import useItemService from './useItemService';
import useBrandService from './useBrandService';
import useCategoryService from './useCategoryService';
import useUnitService from './useUnitService';
import useMarketService from './useMarketService';

const useHomeLogic = () => {
    // ===== Estados agrupados por funcionalidade =====

    // -- Estados relacionados a listas --
    const [selectedListId, setSelectedListId] = useState(null);
    const [pendingListIdToComplete, setPendingListIdToComplete] = useState(null);
    const [showCompleteListConfirmModal, setShowCompleteListConfirmModal] = useState(false);
    const [unmarkedItemsForList, setUnmarkedItemsForList] = useState([]);
    const [purchaseDateByListId, setPurchaseDateByListId] = useState({});
    const [chaveAcessoByListId, setChaveAcessoByListId] = useState({});

    // -- Estados relacionados a itens --
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemFormData, setItemFormData] = useState({
        itemName: '',
        quantity: 1,
        price: 0,
        itemType: 'common',
    });
    const [itemDetailFormData, setItemDetailFormData] = useState({
        categoryId: null,
        brandId: null,
        unitId: null,
        marketId: null,
        barcode: '',
    });

    // -- Estados relacionados a modais --
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
    const [isSaveItemModalOpen, setIsSaveItemModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isPurchaseDateModalOpen, setIsPurchaseDateModalOpen] = useState(false);
    const [showPurchaseDateModal, setShowPurchaseDateModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [modalInputValue, setModalInputValue] = useState('');
    const [itemModalMode, setItemModalMode] = useState('add');

    // -- Estados relacionados a compartilhamento --
    const [shareToken, setShareToken] = useState(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [lastUsedMarketId, setLastUsedMarketId] = useState(null);

    // -- Estados relacionados a sugestões/autocomplete --
    const [suggestions, setSuggestions] = useState([]);

    // -- Outros estados globais --
    const [total, setTotal] = useState(0);
    const [pendingMarkAsBought, setPendingMarkAsBought] = useState(null);

    // ===== Serviços e hooks organizados =====

    // Serviços de listas
    const {
        lists,
        createList,
        updateList,
        deleteList,
        markListCompleted,
        successList,
        errorList,
        loadingList,
    } = useListService();

    // Serviços de itens da lista
    const {
        listItems,
        loadingListItem,
        errorListItem,
        successListItem,
        fetchItemsByListId,
        markItemAsBought,
        addListItem,
        updateListItem,
        deleteListItem,
    } = useListItemService();

    // Serviços de sugestão de itens
    const {
        searchItemByBarcodeOrName,
        items: itemSuggestions,
        loadingItem,
        errorItem,
        successItem,
    } = useItemService();

    // Serviços de marcas
    const {
        brands,
        fetchBrands,
        loading: loadingBrands,
        createBrand,
    } = useBrandService();

    // Serviços de categorias
    const {
        categories,
        fetchCategorys,
        loading: loadingCategories,
        createCategory,
    } = useCategoryService();

    // Serviços de unidades
    const {
        units,
        fetchUnits,
        loading: loadingUnits,
        createUnit,
    } = useUnitService();

    // Serviços de mercados
    const {
        markets,
        fetchMarkets,
        loading: loadingMarkets,
        createMarket,
    } = useMarketService();

    // Serviço de token de compartilhamento
    const { generateShareToken } = useShareTokenService();

    // ===== useEffect organizados =====
    useEffect(() => {
        fetchBrands();
        fetchCategorys();
        fetchUnits();
        fetchMarkets();
    }, [fetchBrands, fetchCategorys, fetchUnits, fetchMarkets]);

    useEffect(() => {
        if (!pendingListIdToComplete) return;

        const filtered = listItems.filter(
            (item) => item.listId === pendingListIdToComplete && !item.purchasedAt
        );
        setUnmarkedItemsForList(filtered);
    }, [listItems, pendingListIdToComplete]);

    // Atualiza o total toda vez que listItems mudam
    useEffect(() => {
        const newTotal = listItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(newTotal);
    }, [listItems]);

    // Carrega o último mercado usado do localStorage ao montar componente
    useEffect(() => {
        const savedMarketId = localStorage.getItem('lastUsedMarketId');
        if (savedMarketId) setLastUsedMarketId(Number(savedMarketId));
    }, []);

    // Salva no localStorage o último mercado usado sempre que ele mudar
    useEffect(() => {
        if (lastUsedMarketId !== null) {
            localStorage.setItem('lastUsedMarketId', lastUsedMarketId);
        }
    }, [lastUsedMarketId]);

    // Carrega a última data de compra salva do localStorage (exemplo para uso futuro)
    useEffect(() => {
        const savedDate = localStorage.getItem('lastUsedPurchaseDate');
        if (savedDate) {
            // aplica para listas já carregadas (se quiser aplicar automaticamente)
            setPurchaseDateByListId(prev => ({
                ...prev,
                default: savedDate
            }));
        }
    }, []);

    // ===== Funções para criação rápida (add) =====
    const handleAddBrand = async (name) => {
        await createBrand(name);
    };

    const handleAddCategory = async (name) => {
        await createCategory(name);
    };

    const handleAddUnit = async (name) => {
        await createUnit(name);
    };

    const handleAddMarket = async (name) => {
        await createMarket(name);
    };

    // ===== Variáveis derivadas =====
    const selectedList = lists.find((list) => list.listId === selectedListId) || null;

    // ===== Função para resetar seleção de lista =====
    function clearLastUsedData() {
        localStorage.removeItem('lastUsedPurchaseDate');
        localStorage.removeItem('lastUsedChaveAcesso');
        setLastUsedMarketId(null);
        setPurchaseDateByListId({});
    }

    // ========== LISTAS ==========

    // Seleciona uma lista no sidebar
    const handleSelectList = useCallback(async (listId) => {
        setSelectedListId(listId);
        await fetchItemsByListId(listId);
        setSelectedItem(null);
        setIsSidebarOpen(false);
    }, [fetchItemsByListId]);

    // Abre o modal de criação de nova lista
    const handleAddList = () => {
        setModalMode('add');
        setModalInputValue('');
        setIsModalOpen(true);
    };

    // Abre o modal para editar o nome da lista
    const handleEditList = (list) => {
        setModalMode('edit');
        setModalInputValue(list.listName);
        setSelectedListId(list.listId);
        setIsModalOpen(true);
    };

    // Confirma criação ou edição da lista
    const handleModalConfirm = async () => {
        if (!modalInputValue.trim()) return;

        if (modalMode === 'add') {
            const nova = await createList(modalInputValue.trim());
            if (nova?.listId) {
                setSelectedListId(nova.listId);
                setIsModalOpen(false);
            }
        } else if (modalMode === 'edit') {
            await updateList(selectedListId, { listName: modalInputValue.trim() });
            setIsModalOpen(false);
        }
    };

    // Fecha a lista selecionada
    function closeSelectedList() {
        setSelectedListId(null);
        setSelectedItem(null);
        setSuggestions([]);
        clearLastUsedData();
    }

    // Deleta uma lista
    const handleDeleteList = async (listId) => {
        await deleteList(listId);
        if (selectedListId === listId) {
            setSelectedListId(null);
            setSelectedItem(null);
            setTotal(0);
        }
    };

    // Compartilha uma lista
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

    // Inicia processo de concluir a lista com data
    const handleStartCompleteList = (listId) => {
        const existingDate = purchaseDateByListId[listId] || localStorage.getItem('lastUsedPurchaseDate');
        const existingChave = chaveAcessoByListId[listId] || localStorage.getItem('lastUsedChaveAcesso');

        setPendingListIdToComplete(listId);

        // Só pula modal se tiver data e chave
        if (existingDate && existingChave) {
            setPurchaseDateByListId(prev => ({
                ...prev,
                [listId]: existingDate
            }));
            setChaveAcessoByListId(prev => ({
                ...prev,
                [listId]: existingChave
            }));
            setShowCompleteListConfirmModal(true);
        } else {
            // Se faltar data ou chave → abre modal
            setShowPurchaseDateModal(true);
        }
    };

    // Confirma a data de compra e abre confirmação final
    const handleConfirmPurchaseDate = ({ purchaseDate, chaveAcesso }) => {
        setPurchaseDateByListId(prev => ({
            ...prev,
            [pendingListIdToComplete]: purchaseDate,
        }));
        setChaveAcessoByListId(prev => ({
            ...prev,
            [pendingListIdToComplete]: chaveAcesso,
        }));

        localStorage.setItem('lastUsedPurchaseDate', purchaseDate);
        localStorage.setItem('lastUsedChaveAcesso', chaveAcesso);

        setShowPurchaseDateModal(false);
        setShowCompleteListConfirmModal(true);
    };

    // Conclui apenas a lista (sem marcar os itens)
    const handleConfirmOnlyList = async () => {
        if (!pendingListIdToComplete) return;

        await handleCompleteList(pendingListIdToComplete);

        // Remove chave do localStorage após concluir
        localStorage.removeItem('lastUsedChaveAcesso');
        localStorage.removeItem('lastUsedPurchaseDate');

        setShowCompleteListConfirmModal(false);
        setPendingListIdToComplete(null);
    };

    // Conclui lista e marca os itens como comprados
    const handleConfirmWithItems = async () => {
        const listId = pendingListIdToComplete;
        const date = purchaseDateByListId[listId];

        const itemsToMark = unmarkedItemsForList.filter(item => item.listId === listId);

        await Promise.all(
            itemsToMark.map(item =>
                markItemAsBought({
                    itemId: item.itemId,
                    listId: item.listId,
                    itemListId: item.itemListId,
                    categoryId: null,
                    brandId: null,
                    unitId: null,
                    marketId: lastUsedMarketId,
                    barcode: null,
                    purchaseDate: date,
                })
            )
        );

        await handleCompleteList(listId);

        // Remove chave do localStorage após concluir
        localStorage.removeItem('lastUsedChaveAcesso');
        localStorage.removeItem('lastUsedPurchaseDate');

        setShowCompleteListConfirmModal(false);
        setPendingListIdToComplete(null);
    };

    // Finaliza a lista e salva o total
    const handleCompleteList = async (listId) => {
        const totalForList = listItems
            .filter(item => item.listId === listId)
            .reduce((acc, item) => acc + item.quantity * item.price, 0);

        if (totalForList <= 0) {
            throw new Error('O total da lista deve ser um número válido e maior que zero, tente selecionar a lista, ou adicionar algum item nela');
        }
        await markListCompleted({
            listId,
            totalAmount: totalForList,
            purchaseDate: purchaseDateByListId[listId] || null,
            marketId: lastUsedMarketId,
            chaveAcesso: chaveAcessoByListId[listId] || null,
        });
        setSelectedListId(listId);
        setIsConfirmDeleteModalOpen(true);
    };

    // Confirma exclusão da lista
    const handleConfirmDelete = async () => {
        if (selectedListId) {
            await handleDeleteList(selectedListId);
            setSelectedListId(null);
            setIsConfirmDeleteModalOpen(false);
        }
    };

    // Cancela modal de exclusão
    const handleCancelDelete = () => {
        setSelectedListId(null);
        setIsConfirmDeleteModalOpen(false);
    };

    // ========== ITENS ==========

    // Atualiza o nome do item digitado e busca sugestões se o tipo for custom
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

    // Ao selecionar uma sugestão, atualiza os dados para o tipo common
    const handleSelectSuggestion = (item) => {
        setItemFormData((prev) => ({
            ...prev,
            itemName: item.itemName,
            itemType: 'common',
            itemId: item.itemId,
        }));
        setSuggestions([]);
    };

    // Abre o modal para adicionar item novo
    const openAddItemModal = () => {
        setItemModalMode('add');
        setItemFormData({ itemName: '', quantity: 1, price: 0, itemType: 'custom', itemId: null });
        setIsItemModalOpen(true);
    };

    // Abre o modal para editar um item existente
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

    // Confirma adição ou edição de item
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

    // Quando o item é "comprado" for clicado
    const handleCheckItem = (item) => {
        const listDate = purchaseDateByListId[item.listId];

        if (!listDate) {
            setPendingMarkAsBought(item);
            setIsPurchaseDateModalOpen(true);
            return;
        }

        handleMarkAsBoughtClick(item);
    };

    // Seleciona data de compra e marca item
    const handlePurchaseDateSelected = (date) => {
        if (!pendingMarkAsBought) return;

        setPurchaseDateByListId(prev => ({
            ...prev,
            [pendingMarkAsBought.listId]: date
        }));

        localStorage.setItem('lastUsedPurchaseDate', date);

        handleMarkAsBoughtClick(pendingMarkAsBought);

        setPendingMarkAsBought(null);
        setIsPurchaseDateModalOpen(false);
    };

    // Abre modal para salvar os dados do item
    const handleMarkAsBoughtClick = (item) => {
        const fullItem = itemSuggestions.find((sug) => sug.itemId === item.itemId);
        const enrichedItem = { ...item, ...fullItem, marketId: lastUsedMarketId };

        setSelectedItem(enrichedItem);
        setIsSaveItemModalOpen(true);
    };

    // Fecha qualquer modal relacionado ao item
    const handleCancel = () => {
        setSelectedItem(null);
        setIsConfirmSaveModalOpen(false);
        setIsSaveItemModalOpen(false);
    };

    // Marca item como comprado sem salvar info extra
    const handleDontSave = async () => {
        if (!selectedItem) return;

        await markItemAsBought({
            itemId: selectedItem.itemId,
            listId: selectedItem.listId,
            itemListId: selectedItem.itemListId,
            categoryId: null,
            brandId: null,
            unitId: null,
            marketId: lastUsedMarketId,
            barcode: null,
            purchaseDate: purchaseDateByListId[selectedItem.listId]
        });

        handleCancel();
    };

    // Confirma que quer salvar os dados do item comprado
    const handleConfirmSave = () => {
        setIsConfirmSaveModalOpen(false);
        if (selectedItem) {
            setItemDetailFormData({
                categoryId: selectedItem.categoryId || null,
                brandId: selectedItem.brandId || null,
                unitId: selectedItem.unitId || null,
                marketId: selectedItem.marketId || lastUsedMarketId || null,
                barcode: selectedItem.barcode || '',
            });
        }
        setIsSaveItemModalOpen(true);
    };

    // Busca a data de compra para a lista selecionada
    const getPurchaseDateForList = (listId) => {
        // Retorna a data específica da lista, se já tiver sido definida
        if (purchaseDateByListId[listId]) return purchaseDateByListId[listId];

        // Se não tiver, tenta pegar a última usada no localStorage
        const lastUsedDate = localStorage.getItem('lastUsedPurchaseDate');
        return lastUsedDate || null;
    };

    // Salva os dados extras do item comprado
    const handleSubmitItemInfo = async (data) => {
        if (!selectedItem) return;

        setLastUsedMarketId(data.marketId);

        const payload = {
            itemId: selectedItem.itemId,
            listId: selectedItem.listId,
            itemListId: selectedItem.itemListId,
            categoryId: data.categoryId,
            brandId: data.brandId,
            unitId: data.unitId,
            marketId: data.marketId,
            barcode: data.barcode,
            purchaseDate: getPurchaseDateForList(selectedItem.listId),
        };

        await markItemAsBought(payload);

        handleCancel();
    };

    // Deleta item da lista
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
        loadingListItem,
        errorList,
        errorItem,
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
        successList,
        successItem,
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
        itemDetailFormData,

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
        loadingList,

        handleStartCompleteList,

        showPurchaseDateModal,
        setShowPurchaseDateModal,
        handleConfirmPurchaseDate,
        showCompleteListConfirmModal,
        setShowCompleteListConfirmModal,
        handleConfirmWithItems,
        handleConfirmOnlyList,
        successListItem,
        errorListItem,
        loadingItem,
        closeSelectedList,
        unmarkedItemsForList,
        handleAddBrand,
        handleAddCategory,
        handleAddUnit,
        handleAddMarket,
        getPurchaseDateForList,
        purchaseDateByListId,
        chaveAcessoByListId,
        pendingMarkAsBought,
        pendingListIdToComplete
    };
};

export default useHomeLogic;
