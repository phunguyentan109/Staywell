const mock = require("node-mocks-http");
const hdl = require("../../handlers");
const prc = require("../prc");
const mw = require("../../middleware")

exports.create = async(user_id, bill, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/bills`,
        method: "POST",
        params: {user_id},
        body: bill,
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Bill.create);
}

exports.get = async(user_id) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/bills`,
        method: "GET",
        params: {user_id}
    });
    return await prc.exec(req, res, hdl.Bill.get);
}

exports.update = async(user_id, bill_id, bill, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/bills/${bill_id}`,
        method: "PUT",
        params: {user_id, bill_id},
        body: bill,
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Bill.update);
}

exports.remove = async(user_id, bill_id, authorization) => {
    const {req, res} = mock.createMocks({
        url: `/user/${user_id}/bills/${bill_id}, authorization`,
        method: "DELETE",
        params: {user_id, bill_id},
        headers: {authorization}
    });
    return await prc.exec(req, res, mw.User.isCorrect, mw.User.isPermit, hdl.Bill.remove);
}
