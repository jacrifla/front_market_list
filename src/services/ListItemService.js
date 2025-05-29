import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list-item';

const listItemService = {
    createItem: async (itemData) => fetchWrapper(`${endpointBase}`, 'POST', itemData),

    updateItem: async (itemListId, itemData) => fetchWrapper(`${endpointBase}/${itemListId}`, 'PUT', itemData),

    getItemsByListId: async (listId) => fetchWrapper(`${endpointBase}/${listId}`),

    deleteItem: async (itemListId) => fetchWrapper(`${endpointBase}/${itemListId}`, 'DELETE'),

    markItemAsBought: async (purchaseData) => fetchWrapper(`${endpointBase}/purchase`, 'POST', purchaseData),
};

export default listItemService;