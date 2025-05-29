import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/shared-list-tokens';

const shareTokenService = {
    generateShareToken: async (listId) => await fetchWrapper(`${endpointBase}/generate-token`, 'POST', { listId }),

    acceptShareToken: async (tokenData) => await fetchWrapper(`${endpointBase}/accept-token`, 'POST', tokenData),
};

export default shareTokenService;