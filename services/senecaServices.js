const seneca = require("seneca");
const {
    getUser,
    deleteUser,
    createUser,
    createCustomer,
    updateCustomer,
    getCustomer,
    uploadFile,
} = require("../actions/userActions");
const { updateUser } = require("../actions/userActions");

const senecaInstance = seneca();
getUser(senecaInstance);
createUser(senecaInstance);
deleteUser(senecaInstance);
updateUser(senecaInstance);
getCustomer(senecaInstance);
createCustomer(senecaInstance);
updateCustomer(senecaInstance);
uploadFile(senecaInstance);
senecaInstance.ready((err) => {
    if (err) {
        console.error("Seneca failed to start:", err);
        process.exit(1);
    } else {
        console.log("Seneca is ready");
        senecaInstance.listen({ type: "web" });
    }
});

module.exports = senecaInstance;
