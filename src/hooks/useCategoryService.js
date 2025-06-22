import { useCallback, useEffect, useState } from "react";
import categoryService from "../services/CategoryService";

const useCategoryService = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const clearMessages = () => {
        setError(null);
        setSuccess(null);
    };

    const fetchCategorys = useCallback(async () => {
        setLoading(true);
        clearMessages();

        try {
            const data = await categoryService.getAllCategorys();
            setCategories(data);
        } catch (error) {
            setError(`Erro ao carregar categorias. ${error}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCategory = async (categoryData) => {
        setLoading(true);
        clearMessages();

        try {
            await categoryService.createCategory(categoryData);
            await fetchCategorys();
            setSuccess("Categoria criada com sucesso!");
        } catch (error) {
            setError(`Erro ao criar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (categoryId, categoryData) => {
        setLoading(true);
        clearMessages();

        try {
            await categoryService.updateCategory(categoryId, categoryData);
            await fetchCategorys();
            setSuccess("Categoria atualizada com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        setLoading(true);
        clearMessages();

        try {
            await categoryService.deleteCategory(categoryId);
            setCategories(prev => prev.filter(category => category.categoryId !== categoryId));
            setSuccess("Categoria deletada com sucesso!");
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
        loadingCategory :loading,
        errorCategory :error,
        successCategory :success,
        fetchCategorys,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}

export default useCategoryService;