import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/list'

const listService = {
    fetchListsByUserId: async () => await fetchWrapper(`${endpointBase}/me`),

    createList: async (data) =>
        await fetchWrapper(`${endpointBase}`, 'POST', data),

    updateList: async (listId, data) =>
        await fetchWrapper(`${endpointBase}/${listId}`, 'PUT', data),

    deleteList: async (listId) => await fetchWrapper(`${endpointBase}/${listId}`, 'DELETE'),

    markListCompleted: async (data) => {
        const { listId, totalAmount, purchaseDate, marketId, chaveAcesso } = data;
        const bodyPayload = { totalAmount, purchaseDate, marketId, chaveAcesso };
        return await fetchWrapper(`${endpointBase}/mark/${listId}`, 'PATCH', bodyPayload);
    }
}

export default listService;