const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    serialNo: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        enum:["Cash","Credit Card", "Debit Card", "UPI"],
        required: true
    },
    status: {
        type: String,
        enum: ["available","In Use"],
    },
    yearOfManufacture: {
        type: Number
    },
    site: {
        type: String,
    },
    assignedOperator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Operator",
        default: null
    }

});

module.exports = mongoose.model("Asset", assetSchema);