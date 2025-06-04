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

    const createMarket = async (marketName) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.createMarket(marketName);
            await fetchMarkets();
            setSuccess("Mercado criado com sucesso!");
        } catch (error) {
            setError(`Erro ao criar mercado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateMarket = async (marketId, marketName) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.updateMarket(marketId, marketName);
            await fetchMarkets();
            setSuccess("Mercado atualizado com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar mercado. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteMarket = async (marketId) => {
        setLoading(true);
        clearMessages();

        try {
            await marketService.deleteMarket(marketId);
            setMarkets(prev => prev.filter(Market => Market.marketId !== marketId));
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
        loading,
        error,
        success,
        fetchMarkets,
        createMarket,
        updateMarket,
        deleteMarket,
    }
}

export default useMarketService;