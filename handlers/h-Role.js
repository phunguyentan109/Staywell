const db = require("../models");

exports.create = async(req, res, next) => {
    try{
        let createdRole = await db.Role.create(req.body);
        return res.json(createdRole);
    }catch(err){
        return res.send(err);
    }
}
