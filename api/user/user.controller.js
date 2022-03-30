const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    patchUser
} = require("./user.service");

const handlerAllUsers = async (req, res) => {
    const users = await getAllUsers();
    if (!users) {
        res.status(404).send("No users found");
    } else {
        res.status(200).send(users);
    }
};

const handlerUserById = async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
        res.status(404).send(`User with id ${ id } not found`);
    } else {
        res.status(200).send(user.profile);
    }
};

const handlerCreateUser = async (req, res) => {
    const user = await createUser(req.body);
    if (!user) {
        res.status(404).send("User not created");
    } else {
        res.status(201).send(user);
    }
};

const handlerDeleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await deleteUser(id);
    if (!user) {
        res.status(404).send(`User with id ${ id } not found`);
    } else {
        res.status(200).send(user);
    }
};

const handlerUpdateUser = async (req, res) => {
    const { id, body } = req.params;
    const user = await patchUser(id, body);
    if (!user) {
        res.status(404).send(`User with id ${ id } not found`);
    } else {
        res.status(200).send(user);
    }
};

module.exports = {
    handlerAllUsers,
    handlerUserById,
    handlerCreateUser,
    handlerDeleteUser,
    handlerUpdateUser,
};
