const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middleware");

router.route("/")
.get(hdl.Bill.get)
.post(mw.User.isCorrect, mw.User.isPermit, hdl.Bill.create);

router.route("/:bill_id")
.get(hdl.Bill.getOne)
.delete(mw.User.isCorrect, mw.User.isPermit, hdl.Bill.remove)
.put(mw.User.isCorrect, mw.User.isPermit, hdl.Bill.update);

module.exports = router;
