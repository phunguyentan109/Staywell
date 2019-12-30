const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");

router.route("/")
    .get(hdl.Contract.get);

router.route("/:contract_id")
    .delete(hdl.Contract.remove);


module.exports = router;
