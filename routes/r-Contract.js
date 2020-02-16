const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
    .get(hdl.Contract.get)
    .post(hdl.Contract.create);

router.route("/:contract_id")
    .get(hdl.Contract.getOne)
    .delete(hdl.Contract.remove);


module.exports = router;
