import { useCallback, useEffect, useState } from "react";
import listService from "../services/ListService";

const useListService = (userId) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLists = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await listService.fetchListsByUserId(userId);
            setLists(data);
        } catch (error) {
            setError('Erro ao carregar as listas. ', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const createList = async (listName) => {
        setLoading(true);
        setError(null);

        try {
            await listService.createList(userId, listName);
            await fetchLists();
        } catch (error) {
            setError('Erro ao criar lista. ', error);
        } finally {
            setLoading(false);
        }
    };

    const updateList = async (listId) => {
        setLoading(true);
        setError(null);

        try {
            await listService.updateList(listId);
            await fetchLists();
        } catch (error) {
            setError(`Erro ao atualizar a lista. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteList = async (listId) => {
        setLoading(true);
        setError(null);

        try {
            await listService.deleteList(listId);
            setLists(prev => prev.filter(list => list.id !== listId));
        } catch (error) {
            setError(`Erro ao deletar lista. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const markListCompleted = async (listId, totalAmount) => {
        setLoading(true);
        setError(null);

        try {
            await listService.markListCompleted(listId, totalAmount);
            await fetchLists();
        } catch (error) {
            setError(`Erro ao marcar lista como concluída. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchLists();
    }, [userId, fetchLists]);

    return {
        lists,
        loading,
        error,
        fetchLists,
        createList,
        updateList,
        deleteList,
        markListCompleted
    }
};

export default useListService;