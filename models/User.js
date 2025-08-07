const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);