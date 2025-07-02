import { useCallback, useEffect, useState } from "react"
import brandService from "../services/BrandService";

const useBrandService = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    const fetchBrands = useCallback(async () => {
        setLoading(true);
        clearMessages();

        try {
            const data = await brandService.getAllBrands();
            setBrands(data);
        } catch (error) {
            setError(`Erro ao carregar marcas. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createBrand = async (name) => {
        setLoading(true);
        clearMessages();

        try {
            await brandService.createBrand(name);
            await fetchBrands();
            setSuccess("Marca criada com sucesso!");
        } catch (error) {
            setError(`Erro ao criar marca. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateBrand = async (id, name) => {
        setLoading(true);
        clearMessages();

        try {
            await brandService.updateBrand(id, name);
            await fetchBrands();
            setSuccess("Marca atualizada com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar marca. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteBrand = async (id) => {
        setLoading(true);
        clearMessages();

        try {
            await brandService.deleteBrand(id);
            setBrands(prev => prev.filter(brand => brand.id !== id));
            setSuccess("Marca deletada com sucesso!");
        } catch (error) {
            setError(`Erro ao deletar marca. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    return {
        brands,
        loadingBrand :loading,
        errorBrand :error,
        successBrand :success,
        fetchBrands,
        createBrand,
        updateBrand,
        deleteBrand,
    }
}

export default useBrandService;