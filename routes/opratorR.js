const express = require("express");

const {getAllOperators,createOperator}= require("../controllers/operatorC");

const {authRole,authenticate}= require("../middlewares/Auth");
const router = express.Router();

router.use(authenticate);

router.get("/getOprator", getAllOperators);
router.post("/creatOprator", authRole("admin"), createOperator);

module.exports = router;