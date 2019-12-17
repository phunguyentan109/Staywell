const express = require("express");
const router = express.Router();
const hdl = require("../handlers");

router.route("/new").post(hdl.Role.create);

module.exports = router;
