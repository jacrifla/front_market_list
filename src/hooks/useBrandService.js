import { useCallback, useEffect, useState } from "react"
import brandService from "../services/BrandService";

const useBrandService = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBrands = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await brandService.getAllBrands();
            setBrands(data);
        } catch (error) {
            setError(`Erro ao carregar marcas. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createBrand = async (brandName) => {
        setLoading(true);
        setError(null);

        try {
            await brandService.createBrand({ brandName });
            await fetchBrands();
        } catch (error) {
            setError(`Erro ao criar marca. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateBrand = async (brandId, brandName) => {
        setLoading(true);
        setError(null);

        try {
            await brandService.updateBrand(brandId, { brandName });
            await fetchBrands();
        } catch (error) {
            setError(`Erro ao atualizar marca. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteBrand = async (brandId) => {
        setLoading(true);
        setError(null);

        try {
            await brandService.deleteBrand(brandId);
            setBrands(prev => prev.filter(brand => brand.id !== brandId));
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
        loading,
        error,
        fetchBrands,
        createBrand,
        updateBrand,
        deleteBrand,
    }
}

export default useBrandService;