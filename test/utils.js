const mock = require("node-mocks-http");

exports.handlePrc = async(req, res, ...prcs) => {
    return exec(req, res, prcs, prcs.length);
}

async function exec(req, res, prcs, length){
    try {
        await prcs[0](req, res, err => {if(err) throw err});
        prcs.splice(0, 1);

        if(prcs.length === 0) {
            return JSON.parse(res._getData());
        } else {
            return exec(req, res, prcs, length);
        }
    } catch(err) {
        return err;
    }
}
