const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
         
    },
    site:{
        type: String,
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    }
});

module.exports = mongoose.model("Operator", operatorSchema);