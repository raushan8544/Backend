const jwt = require("jsonwebtoken");
const User = require("../models/User")
require("dotenv").config();

 exports.authenticate = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = req.cookies.token 
                        || req.body.token 
                        ||(authHeader && authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : null);
                         console.log("Extracted Token:", token);
        if (!token){
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();

        }
        catch (error){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });

        }

    }
    catch (error){
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
        });
    }
}

exports.authRole = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied',
            });
        }
        next();
    }
}

