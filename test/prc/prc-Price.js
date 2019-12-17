const mock = require("node-mocks-http");
const hdl = require("../../handlers");
const prc = require("../prc");
const mw = require("../../middleware")

exports.create = async(user_id, price, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/prices`,
        method: "POST",
        params: {user_id},
        body: price,
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Price.create);
}

exports.get = async(user_id) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/prices`,
        method: "GET",
        params: {user_id}
    });
    return await prc.exec(req, res, hdl.Price.get);
}

exports.update = async(user_id, price_id, price, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/prices/${price_id}`,
        method: "PUT",
        params: {user_id, price_id},
        body: price,
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Price.update);
}

exports.remove = async(user_id, price_id, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/prices/${price_id}, authorization`,
        method: "DELETE",
        params: {user_id, price_id},
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Price.remove);
}
