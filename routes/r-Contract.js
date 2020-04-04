const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
    .get(hdl.Contract.get)
    .post(hdl.Contract.create);

router.route("/:contract_id")
    .get(hdl.Contract.getOne)
    .delete(hdl.Contract.remove);

router.use("/:contract_id/bills", require("./r-Bill"));

module.exports = router;
