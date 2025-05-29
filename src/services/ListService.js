import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list'

const listService = {
    fetchListsByUserId: async (userId) => await fetchWrapper(`${endpointBase}/${userId}`),

    createList: async (userId, listName) => await fetchWrapper(`${endpointBase}`, 'POST', { userId, listName }),

    updateList: async (listId, { listName }) => await fetchWrapper(`${endpointBase}/${listId}`, 'PUT', { listName }),

    deleteList: async (listId) => await fetchWrapper(`${endpointBase}/${listId}`, 'DELETE'),

    markListCompleted: async ({ listId, userId, totalAmount, purchaseDate }) =>
        await fetchWrapper(`${endpointBase}/mark/${listId}`, 'PATCH', { userId, totalAmount, purchaseDate }),

}

export default listService;