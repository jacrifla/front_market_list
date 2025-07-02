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

    const createUnit = async (name) => {
        setLoading(true);
        clearMessages();

        try {
            await unitService.createUnit(name);
            await fetchUnits();
            setSuccess("Unidade criada com sucesso!");
        } catch (error) {
            setError(`Erro ao criar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateUnit = async (id, name) => {
        setLoading(true);
        clearMessages();

        try {
            await unitService.updateUnit(id, name);
            await fetchUnits();
            setSuccess("Unidade atualizada com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar unidade. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteUnit = async (id) => {
        setLoading(true);
        clearMessages();

        try {
            await unitService.deleteUnit(id);
            setUnits(prev => prev.filter(unit => unit.id !== id));
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
        loadingUnit :loading,
        errorUnit :error,
        successUnit :success,
        fetchUnits,
        createUnit,
        updateUnit,
        deleteUnit,
    }
}

export default useUnitService;