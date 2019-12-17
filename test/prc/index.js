require("dotenv").config();

async function exec(req, res, prcs, length){
    try {
        await prcs[0](req, res, err => {if(err) throw err});
        prcs.splice(0, 1);

        if(prcs.length === 0) {
            return res._getData() ? JSON.parse(res._getData()) : {};
        } else {
            return await exec(req, res, prcs, length);
        }
    } catch(err) {
        return err;
    }
}

module.exports.exec = async(req, res, ...prcs) => {
    return await exec(req, res, prcs, prcs.length);
}

module.exports.User = require("./prc-User");
module.exports.Price = require("./prc-Price");
module.exports.Room = require("./prc-Room");
module.exports.Bill = require("./prc-Bill");
