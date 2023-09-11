const express = require("express");
const { checkNotice } = require("../helper/checkNotice");
const router = express.Router();

router.get("/api/check-notice", checkNotice);

module.exports = router;
