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

    const updateCategory = async (id, categoryData) => {
        setLoading(true);
        clearMessages();

        try {
            await categoryService.updateCategory(id, categoryData);
            await fetchCategorys();
            setSuccess("Categoria atualizada com sucesso!");
        } catch (error) {
            setError(`Erro ao atualizar categoria. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        setLoading(true);
        clearMessages();

        try {
            await categoryService.deleteCategory(id);
            setCategories(prev => prev.filter(category => category.id !== id));
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