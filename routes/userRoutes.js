const express = require("express");
const senecaInstance = require("../services/senecaServices");
const {
    DELETE_USER,
    GET_USER,
    POST_USER,
    UPDATES_USER,
    USER,
    CUSTOMER,
    Post_Customer,
    Update_Customer,
    Get_Customer,
    Upload_file,
} = require("../constants/userConstants");

const router = express.Router();

router.post("/uploadFile", (req, res) => {
    senecaInstance.act(
        { role: USER, cmd: Upload_file, req: req },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi upload file",
                });
            }
            res.json(result);
        },
    );
});
router.get("/getCustomer", (req, res) => {
    senecaInstance.act(
        {
            role: CUSTOMER,
            cmd: Get_Customer,
            customerId: req.query,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi get customer",
                });
            }
            res.json(result);
        },
    );
});
router.post("/createCustomer", (req, res) => {
    senecaInstance.act(
        { role: CUSTOMER, cmd: Post_Customer, customerData: req.body },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi create customer",
                });
            }
            res.json(result);
        },
    );
});

router.put("/updateCustomer/:id", (req, res) => {
    senecaInstance.act(
        {
            role: CUSTOMER,
            cmd: Update_Customer,
            customerId: req.params,
            customerData: req.body,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi update customer",
                });
            }
            res.json(result);
        },
    );
});

router.post("/createUser", (req, res) => {
    senecaInstance.act(
        { role: USER, cmd: POST_USER, userData: req.body },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi create user",
                });
            }

            res.json(result);
        },
    );
});

router.get("/getUser", (req, res) => {
    senecaInstance.act(
        {
            role: USER,
            cmd: GET_USER,
            userId: req.query,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi get user",
                });
            }

            res.json(result);
        },
    );
});

router.delete("/deleteUser/:id", (req, res) => {
    senecaInstance.act(
        {
            role: USER,
            cmd: DELETE_USER,
            userId: req.params,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi delete user",
                });
            }
            res.json(result);
        },
    );
});

router.put("/updateUser/:id", (req, res) => {
    senecaInstance.act(
        {
            role: USER,
            cmd: UPDATES_USER,
            userId: req.params,
            userData: req.body,
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: "Lỗi update user",
                });
            }
            res.json(result);
        },
    );
});

module.exports = router;
