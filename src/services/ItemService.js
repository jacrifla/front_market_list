import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/items';

const itemService = {
    getAllItems: () => fetchWrapper(`${endpointBase}/all`),

    getItemByBarcodeName: (searchTerm) => fetchWrapper(`${endpointBase}/search/${searchTerm}`),

    getItemById: (itemId) => fetchWrapper(`${endpointBase}/id/${itemId}`),

    createItem: (itemData) => fetchWrapper(`${endpointBase}`, 'POST', itemData),

    updateItem: (itemId, itemData) => fetchWrapper(`${endpointBase}/${itemId}`, 'PUT', itemData),

    deleteItem: (itemId) => fetchWrapper(`${endpointBase}/${itemId}`, 'DELETE'),
};

export default itemService;