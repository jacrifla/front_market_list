import userService from '../services/UserService';

const useUserService = () => {
    const getByEmail = async (email) => await userService.getByEmail(email);

    const getById = async (userId) => await userService.getById(userId);

    const createUser = async (userData) => await userService.createUser(userData);

    const updateUser = async (userId, userData) => await userService.updateUser(userId, userData);

    const restoreUser = async (email) => await userService.restoreUser(email);

    const resetPassword = async (userData) => await userService.resetPassword(userData);

    const login = async (userData) => await userService.login(userData);

    const deleteUser = async (userId) => await userService.deleteUser(userId);

    return {
        getByEmail,
        getById,
        createUser,
        updateUser,
        restoreUser,
        resetPassword,
        login,
        deleteUser,
    };
};

export default useUserService;