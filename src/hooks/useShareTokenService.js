import shareTokenService from '../services/shareTokenService';

const useShareTokenService = () => {
    const generateShareToken = async (listId) => {
        return await shareTokenService.generateShareToken(listId);
    };

    const acceptShareToken = async (tokenData) => {
        return await shareTokenService.acceptShareToken(tokenData);
    };

    return {
        generateShareToken,
        acceptShareToken,
    };
};

export default useShareTokenService;
