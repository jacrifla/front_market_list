import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list'

const listService = {
    fetchListsByUserId: (userId) => fetchWrapper(`${endpointBase}/${userId}`),

    createList: (userId, listName) => fetchWrapper(`${endpointBase}`, 'POST', { userId, listName }),

    updateList: (listId, listName) => fetchWrapper(`${endpointBase}/${listId}`, 'PUT', { listName }),

    deleteList: (listId) => fetchWrapper(`${endpointBase}/${listId}`, 'DELETE'),

    markListCompleted: (listId, totalAmout) => fetchWrapper(`${endpointBase}/mark/${listId}`, 'PATCH', { totalAmout }),
}

export default listService;