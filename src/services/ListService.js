import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list'

const listService = {
    fetchListsByUserId: async (userId) => await fetchWrapper(`${endpointBase}/${userId}`),

    createList: async (data) =>
        await fetchWrapper(`${endpointBase}`, 'POST', data),

    updateList: async (listId, data) =>
        await fetchWrapper(`${endpointBase}/${listId}`, 'PUT', data),

    deleteList: async (listId) => await fetchWrapper(`${endpointBase}/${listId}`, 'DELETE'),

    markListCompleted: async (data) =>
        await fetchWrapper(`${endpointBase}/mark/${data.listId}`, 'PATCH', data),

}

export default listService;