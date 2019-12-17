const hdl = require("../../handlers");
const prc = require("../prc");
const mock = require("node-mocks-http");

exports.signUp = async(user) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/user/signup",
        body: user
    });
    return await prc.exec(req, res, hdl.User.signUp);
}

exports.logIn = async(user) => {
    const {req, res} = mock.createMocks({
        method: "POST",
        url: "/api/user/signin",
        body: user
    });
    return await prc.exec(req, res, hdl.User.logIn);
}
