import { useCallback, useEffect, useState } from "react";
import itemService from "../services/ItemService";

const useItemService = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllItems = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await itemService.getAllItems();
            setItems(data);
        } catch (error) {
            setError(`Erro ao buscar itens. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchItemById = async (itemId) => {
        setLoading(true);
        setError(null);

        try {
            const data = await itemService.getItemById(itemId);
            setSelectedItem(data);
        } catch (error) {
            setError(`Erro ao buscar item por ID. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const searchItemByBarcodeOrName = async (term) => {
        setLoading(true);
        setError(null);

        try {
            const data = await itemService.getItemByBarcodeName(term);
            setItems(data);
        } catch (error) {
            setError(`Erro na busca por código de barras ou nome. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const createItem = async (itemData) => {
        setLoading(true);
        setError(null);

        try {
            await itemService.createItem(itemData);
            await fetchAllItems();
        } catch (error) {
            setError(`Erro ao criar item. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async (itemId, itemData) => {
        setLoading(true);
        setError(null);

        try {
            await itemService.updateItem(itemId, itemData);
            await fetchAllItems();
        } catch (error) {
            setError(`Erro ao atualizar item. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (itemId) => {
        setLoading(true);
        setError(null);

        try {
            await itemService.deleteItem(itemId);
            await fetchAllItems();
        } catch (error) {
            setError(`Erro ao deletar item. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllItems();
    }, [fetchAllItems]);

    return {
        items,
        selectedItem,
        loading,
        error,
        fetchAllItems,
        fetchItemById,
        searchItemByBarcodeOrName,
        createItem,
        updateItem,
        deleteItem,
    }
}

export default useItemService;