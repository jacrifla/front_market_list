import { useCallback, useEffect, useState } from "react"
import marketService from "../services/MarketService";

const useMarketService = () => {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    const fetchMarkets = useCallback(async () => {
        setLoading(true);
        clearMessages();

        try {
            const data = await marketService.getAllMarkets();
            setMarkets(data);
        } catch (error) {
            setError(`Erro ao carregar mercados. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createMarket = async (name) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.createMarket(name);
            await fetchMarkets();
            setSuccess("Mercado criado com sucesso!");
        } catch (error) {
            setError(`Erro ao criar mercado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateMarket = async (id, name) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.updateMarket(id, name);
            await fetchMarkets();
            setSuccess("Mercado atualizado com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar mercado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteMarket = async (id) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.deleteMarket(id);
            setMarkets(prev => prev.filter(Market => Market.id !== id));
            setSuccess("Mercado deletado com sucesso!");
        } catch (error) {
            setError(`Erro ao deletar mercado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarkets();
    }, [fetchMarkets]);

    return {
        markets,
        loadingMarket :loading,
        errorMarket :error,
        successMarket :success,
        fetchMarkets,
        createMarket,
        updateMarket,
        deleteMarket,
    }
}

export default useMarketService;