const Asset = require("../models/Asset");
const Operator = require("../models/Operator");

exports.getAllAssets = async (req, res) => {
     try {
        const assets = await Asset.find().populate("assignedOperator");
        res.json(assets);

     }
     catch (error){
        console.error("Error fetching assets:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
     }
    
};

exports.createAsset = async (req, res)=> {
    try {
         const assets = await Asset.create(req.body);
         res.status(201).json(assets);

    }
    catch (error){
        console.error("Error creating asset:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

exports.updateAsset = async (req, res)=> {
    try {
        const assets = await Asset.findByIdAndUpdate(req.params.id, req.body,
        {new: true});
        res.json(assets);

    }
    catch (error){
        console.error("Error updating asset:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

exports.deleteAsset = async (req, res)=> {
    try {
         await Asset.findByIdAndDelete(req.params.id, req.body);
        res.json({
        success: true,
        message: "Asset deleted successfully"
    })

    }
    catch (error){
        console.error("Error deleting asset:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

exports.assignAsset = async (req, res) => {
    const {operatorId} = req.body;
    const asset = await Asset.findById(req.params.id);
    asset.assignedOperator = operatorId;
    asset.status = "In Use";
    await asset.save();
    res.json(asset);
}

exports.unassignAsset = async (req, res) => {
    const asset = await Asset.findById(req.params.id);
    asset.assignedOperator = null;
    asset.status = "available";
    await asset.save();
    res.json(asset);
}