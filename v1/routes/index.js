const express = require("express");
const user = require("./user");
const router = express();
router.use("/user", user);



module.exports = router;
