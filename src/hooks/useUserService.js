import userService from '../services/UserService';

const useUserService = () => {
    const getByEmail = (email) => userService.getByEmail(email);

    const getById = (userId) => userService.getById(userId);

    const createUser = (userData) => userService.createUser(userData);

    const updateUser = (userId, userData) => userService.updateUser(userId, userData);

    const restoreUser = (email) => userService.restoreUser(email);

    const resetPassword = (userData) => userService.resetPassword(userData);

    const login = (userData) => userService.login(userData);

    const deleteUser = (userId) => userService.deleteUser(userId);

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
