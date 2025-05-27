import { fetchWrapper } from "../utils/fetchWrapper";

const endpointBase = '/shared-list-tokens';

const shareTokenService = {
    generateShareToken: (listId) => fetchWrapper(`${endpointBase}/generate-token`, 'POST', { listId }),

    acceptShareToken: (tokenData) => fetchWrapper(`${endpointBase}/accept-token`, 'POST', tokenData),
};

export default shareTokenService;