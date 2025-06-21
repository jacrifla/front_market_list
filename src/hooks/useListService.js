import { useCallback, useEffect, useState } from "react";
import listService from "../services/ListService";

const useListService = (userId) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                clearMessages();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const fetchLists = useCallback(async () => {
        setLoading(true);
        clearMessages();

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
        clearMessages();

        try {
            const newList = await listService.createList(userId, listName);
            await fetchLists();
            setSuccess('Lista criada com sucesso.');
            return newList;
        } catch (error) {
            setError('Erro ao criar lista. ', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    const updateList = async (listId, { listName }) => {
        setLoading(true);
        clearMessages();
        
        try {
            await listService.updateList(listId, { listName });
            await fetchLists();
            setSuccess('Lista alterada com sucesso.');
        } catch (error) {
            setError(`Erro ao atualizar a lista. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteList = async (listId) => {
        setLoading(true);
        clearMessages();

        try {
            await listService.deleteList(listId);
            setLists(prev => prev.filter(list => list.listId !== listId));
            setSuccess('Lista deletada com sucesso!');
        } catch (error) {
            setError(`Erro ao deletar lista. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const markListCompleted = async ({ listId, userId, totalAmount, purchaseDate }) => {        
        setLoading(true);
        clearMessages();

        try {
            await listService.markListCompleted({ listId, userId, totalAmount, purchaseDate });
            await fetchLists();
            setSuccess('Lista marcada com sucesso')
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
        loadingList: loading,
        errorList :error,
        successList :success,
        fetchLists,
        createList,
        updateList,
        deleteList,
        markListCompleted,
    }
};

export default useListService;