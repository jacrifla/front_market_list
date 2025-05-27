import { useCallback, useEffect, useState } from "react"
import unitService from "../services/UnitService";

const useUnitService = () => {
    const [markets, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUnits = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await unitService.getAllUnits();
            setUnits(data);
        } catch (error) {
            setError(`Erro ao carregar unidades. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createUnit = async (unitName) => {
        setLoading(true);
        setError(null);

        try {
            await unitService.createUnit({ unitName });
            await fetchUnits();
        } catch (error) {
            setError(`Erro ao criar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateUnit = async (unitId, unitName) => {
        setLoading(true);
        setError(null);

        try {
            await unitService.updateUnit(unitId, { unitName });
            await fetchUnits();
        } catch (error) {
            setError(`Erro ao atualizar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteUnit = async (unitId) => {
        setLoading(true);
        setError(null);

        try {
            await unitService.deleteUnit(unitId);
            setUnits(prev => prev.filter(Unit => Unit.id !== unitId));
        } catch (error) {
            setError(`Erro ao deletar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, [fetchUnits])

    return {
        markets,
        loading,
        error,
        fetchUnits,
        createUnit,
        updateUnit,
        deleteUnit,
    }
}

export default useUnitService;