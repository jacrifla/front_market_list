import { useCallback, useState } from "react";
import listItemService from "../services/ListItemService";

const useListItemService = () => {
    const [listItems, setListItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItemsByListId = useCallback(async (listId) => {
        setLoading(true);
        setError(null);

        try {
            const data = await listItemService.getItemsByListId(listId);
            setListItems(data);
        } catch (error) {
            setError(`Erro ao buscar itens da lista. ${error}`)
        } finally {
            setLoading(false);
        }
    }, []);

    const addListItem = async (itemData) => {
        setLoading(true);
        setError(null);

        try {
            await listItemService.createItem(itemData);
            await fetchItemsByListId(itemData.listId);
        } catch (error) {
            setError(`Erro ao adicionar item à lista. ${error}`)
        } finally {
            setLoading(false);
        }
    };

    const updateListItem = async (itemListId, itemData) => {
        setLoading(true);
        setError(null);

        try {
            await listItemService.updateItem(itemListId, itemData);
            await fetchItemsByListId(itemData.listId);
        } catch (error) {
            setError(`Erro ao atualizar item à lista. ${error}`)
        } finally {
            setLoading(false);
        }
    };

    const deleteListItem = async (itemListId, listId) => {
        setLoading(true);
        setError(null);

        try {
            await listItemService.deleteItem(itemListId);
            await fetchItemsByListId(listId);
        } catch (error) {
            setError(`Erro ao excluir item à lista. ${error}`)
        } finally {
            setLoading(false);
        }
    };

    const markItemAsBought = async (purchaseData) => {
        setLoading(true);
        setError(null);

        try {
            await listItemService.markItemAsBought(purchaseData);
            await fetchItemsByListId(purchaseData.listId);
        } catch (error) {
            setError(`Erro ao excluir item à lista. ${error}`)
        } finally {
            setLoading(false);
        }
    };

    return {
        listItems,
        loading,
        error,
        fetchItemsByListId,
        addListItem,
        updateListItem,
        deleteListItem,
        markItemAsBought,
    };
};

export default useListItemService;