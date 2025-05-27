import { useCallback, useEffect, useState } from "react";
import categoryService from "../services/categoryService";

const useCategoryService = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategorys = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await categoryService.getAllCategorys();
            setCategories(data);
        } catch (error) {
            setError(`Erro ao carregar categorias. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCategory = async (categoryName) => {
        setLoading(true);
        setError(null);

        try {
            await categoryService.createCategory({ categoryName });
            await fetchCategorys();
        } catch (error) {
            setError(`Erro ao criar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (categoryId, categoryName) => {
        setLoading(true);
        setError(null);

        try {
            await categoryService.updateCategory(categoryId, { categoryName });
            await fetchCategorys();
        } catch (error) {
            setError(`Erro ao atualizar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        setLoading(true);
        setError(null);

        try {
            await categoryService.deleteCategory(categoryId);
            setCategories(prev => prev.filter(category => category.id !== categoryId));
        } catch (error) {
            setError(`Erro ao deletar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorys();
    }, [fetchCategorys]);

    return {
        categories,
        loading,
        error,
        fetchCategorys,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}

export default useCategoryService;