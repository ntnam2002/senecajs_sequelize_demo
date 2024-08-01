"use strict";

// const { get } = require('http');
const {
    DELETE_USER,
    GET_USER,
    POST_USER,
    UPDATES_USER,
    USER,
    CUSTOMER,
    Get_Customer,
    Post_Customer,
    Update_Customer,
    Upload_file,
} = require("../constants/userConstants");
let { User, Customers } = require("../models/user");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
function uploadFile(seneca) {
    seneca.add({ role: USER, cmd: Upload_file }, (msg, respond) => {
        const form = new formidable.IncomingForm();
        const uploadsDir = path.join(__dirname, "..", "uploads");

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        form.on("fileBegin", (name, file) => {
            if (file && file.newFilename) {
                file.filepath = uploadsDir + "\\" + file.newFilename;
            } else {
                console.error("File name is not defined");
            }
        });

        form.on("file", (name, file) => {
            console.log("Uploaded " + file.newFilename);
        });

        form.parse(msg.req, (err, fields, files) => {
            if (err) {
                return respond(err);
            }

            // Ensure at least one file is provided
            const uploadedFiles = Object.keys(files).length;
            if (uploadedFiles === 0) {
                return respond(new Error("No file provided"));
            }

            respond(null, { message: "Upload file success", files });
        });
    });
}
function getCustomer(seneca) {
    seneca.add({ role: CUSTOMER, cmd: Get_Customer }, async (msg, respond) => {
        const customerId = msg.customerId;

        if (customerId) {
            const findCustomer = await Customers.findAll({
                where: customerId,
            });
            respond(null, findCustomer);
        } else {
            const findCustomer = await Customers.findAll({});
            respond(null, findCustomer);
        }
    });
}

function createCustomer(seneca) {
    seneca.add({ role: CUSTOMER, cmd: Post_Customer }, async (msg, respond) => {
        const customerData = msg.customerData;
        console.log("Creating customer with data:", customerData);

        const newCustomer = await Customers.create(customerData);
        respond(null, newCustomer);
    });
}
function updateCustomer(seneca) {
    seneca.add(
        { role: CUSTOMER, cmd: Update_Customer },
        async (msg, respond) => {
            const updateCustomer = msg.customerData;
            const customerId = msg.customerId;
            console.log(
                "Updating customer with ID:",
                customerId,
                "and data:",
                updateCustomer,
            );
            try {
                const updatedCustomer = await Customers.update(updateCustomer, {
                    where: customerId,
                    returning: true,
                    plain: true,
                });
                respond(null, { updatedCustomer: updatedCustomer[1] });
            } catch (err) {
                respond(err);
            }
        },
    );
}

function getUser(seneca) {
    seneca.add({ role: USER, cmd: GET_USER }, async (msg, respond) => {
        const userId = msg.userId;
        console.log(userId);
        try {
            if (userId) {
                const findUser = await User.findAll({
                    where: userId,
                });
                console.log("findUser", findUser);
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
    getCustomer,
    createCustomer,
    updateCustomer,
    uploadFile,
};
