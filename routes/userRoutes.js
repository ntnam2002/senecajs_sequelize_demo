const express = require("express");
const senecaInstance = require("../services/senecaServices");
const {
    DELETE_USER,
    GET_USER,
    POST_USER,
    UPDATES_USER,
    USER,
} = require("../constants/userConstants");

const router = express.Router();

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
