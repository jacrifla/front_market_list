import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list-item'

const listItemService = {
    createItem: (itemData) => fetchWrapper(`${endpointBase}`, 'POST', itemData),

    updateItem: (itemListId, itemData) => fetchWrapper(`${endpointBase}/${itemListId}`, 'PUT', itemData),

    getItemsByListId: (listId) => fetchWrapper(`${endpointBase}/${listId}`),

    deleteItem: (itemListId) => fetchWrapper(`${endpointBase}/${itemListId}`, 'DELETE'),

    markItemAsBought: (purchaseData) => fetchWrapper(`${endpointBase}/purchase`, 'POST', purchaseData),
}

export default listItemService;