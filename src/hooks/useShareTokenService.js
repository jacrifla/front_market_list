import shareTokenService from '../services/shareTokenService';

const useShareTokenService = () => {
    const generateShareToken = (listId) => {
        return shareTokenService.generateShareToken(listId);
    };

    const acceptShareToken = (tokenData) => {
        return shareTokenService.acceptShareToken(tokenData);
    };

    return {
        generateShareToken,
        acceptShareToken,
    };
};

export default useShareTokenService;
