import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/items';

const itemService = {
    getAllItems: async () => fetchWrapper(`${endpointBase}/all`),

    getItemByBarcodeName: async (searchTerm) => {
        const encodedTerm = encodeURIComponent(searchTerm.trim());
        return fetchWrapper(`${endpointBase}/search/${encodedTerm}`);
    },

    getItemById: async (itemId) => fetchWrapper(`${endpointBase}/id/${itemId}`),

    createItem: async (itemData) => fetchWrapper(`${endpointBase}`, 'POST', itemData),

    updateItem: async (itemId, itemData) => fetchWrapper(`${endpointBase}/${itemId}`, 'PUT', itemData),

    deleteItem: async (itemId) => fetchWrapper(`${endpointBase}/${itemId}`, 'DELETE'),
};

export default itemService;