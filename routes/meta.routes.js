const express = require("express");
const { metaVerification, metaData } = require("../controllers/metaController");
const router = express.Router();

router.post("/api/recive-msg", metaData);
router.get("/api/recive-msg", metaVerification);

module.exports = router;
