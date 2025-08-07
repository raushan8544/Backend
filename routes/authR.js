const express = require("express");
const router = express.Router();

const {resister,Login}= require("../controllers/authC");

router.post("/register", resister);
router.post("/login", Login);

module.exports = router;