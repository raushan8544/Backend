const express = require("express");

const {getAllAssets,
       createAsset,
       deleteAsset,
       updateAsset,
       assignAsset,
       unassignAsset}= require("../controllers/assetC");

const {authenticate,authRole}= require("../middlewares/Auth");
const router = express.Router();

router.use(authenticate);

router.get("/getAsset", getAllAssets);
router.post("/createAsset",authenticate, authRole("admin"), createAsset);
router.put("/updateAsset", authenticate,authRole("admin"), updateAsset);
router.delete("/deleteAsset", authenticate,authRole("admin"), deleteAsset);
router.post("/assign", authenticate,authRole("admin"), assignAsset);
router.post("/unassign", authenticate,authRole("admin"), unassignAsset);

module.exports = router;
