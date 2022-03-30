const UserModel = require('./user.model');

const getAllUsers = async () => {
    const users = await UserModel.find();
    return users;
}

const getUserByUsername = async (username) => {
    const user = await UserModel.findOne({ username });
    return user;
}

const getUserById = async (id) => {
    const user = await UserModel.findById(id);
    return user;
}

const createUser = async (user) => {
    const newUser = await UserModel.create(user);
    return newUser;
}

const deleteUser = async (id) => {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
}

const patchUser = async (id, user) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user , { new: true });
    return updatedUser;
}

const findOneUser = async (query) => {
    const user = await UserModel.findOne(query);
    return user;
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserById,
    createUser,
    deleteUser,
    patchUser,
    findOneUser
}
