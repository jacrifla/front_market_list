import { useCallback, useEffect, useState } from "react"
import unitService from "../services/UnitService";

const useUnitService = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    const fetchUnits = useCallback(async () => {
        setLoading(true);
        clearMessages();

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
        clearMessages();

        try {
            await unitService.createUnit({ unitName });
            await fetchUnits();
            setSuccess("Unidade criada com sucesso!");
        } catch (error) {
            setError(`Erro ao criar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateUnit = async (unitId, unitName) => {
        setLoading(true);
        clearMessages();

        try {
            await unitService.updateUnit(unitId, { unitName });
            await fetchUnits();
            setSuccess("Unidade atualizada com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteUnit = async (unitId) => {
        setLoading(true);
        clearMessages();

        try {
            await unitService.deleteUnit(unitId);
            setUnits(prev => prev.filter(unit => unit.unitId !== unitId));
            setSuccess("Unidade deletada com sucesso!");
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
        units,
        loading,
        error,
        success,
        fetchUnits,
        createUnit,
        updateUnit,
        deleteUnit,
    }
}

export default useUnitService;