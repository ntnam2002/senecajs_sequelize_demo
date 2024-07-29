const {
    DELETE_USER,
    GET_USER,
    POST_USER,
    UPDATES_USER,
    USER,
} = require("../constants/userConstants");
let { User } = require("../models/user");
function getUser(seneca) {
    seneca.add({ role: USER, cmd: GET_USER }, async (msg, respond) => {
        const userId = msg.userId;
        console.log(userId);
        try {
            if (userId) {
                const findUser = await User.findAll({
                    where: userId,
                });
                respond(null, findUser);
            } else {
                const findUser = await User.findAll({});
                respond(null, findUser);
            }
        } catch (err) {
            respond(err);
        }
    });
}

function createUser(seneca) {
    seneca.add({ role: USER, cmd: POST_USER }, async (msg, respond) => {
        const userData = msg.userData;
        try {
            const newUser = await User.create(userData);
            respond(null, newUser);
        } catch (err) {
            respond(err);
        }
    });
}

function updateUser(seneca) {
    seneca.add({ role: USER, cmd: UPDATES_USER }, async (msg, respond) => {
        const updateUser = msg.userData;

        const userId = msg.userId;
        console.log("Updating user with ID:", userId, "and data:", updateUser);
        try {
            const updatedUser = await User.update(updateUser, {
                where: userId,
                returning: true,
                plain: true,
            });

            respond(null, { updatedUser: updatedUser[1] });
        } catch (err) {
            respond(err);
        }
    });
}

function deleteUser(seneca) {
    seneca.add({ role: USER, cmd: DELETE_USER }, async (msg, respond) => {
        const userId = msg.userId;
        try {
            const deletedUser = await User.destroy({
                where: userId,
            });
            respond(null, { deletedUser: deletedUser });
        } catch (err) {
            respond(err);
        }
    });
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
