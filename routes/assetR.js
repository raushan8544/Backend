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
router.post("/createAsset", authRole("admin"), createAsset);
router.put("/updateAsset", authRole("admin"), updateAsset);
router.delete("/deleteAsset", authRole("admin"), deleteAsset);
router.post("/assign", authRole("admin"), assignAsset);
router.post("/unassign", authRole("admin"), unassignAsset);

module.exports = router;
