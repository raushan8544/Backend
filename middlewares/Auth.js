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
        console.error("Authentication error:", error);
        return res.status(401).json({
            success: false,
            message:error.message|| 'Authentication failed',
        });
    }
}

exports.authRole = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role?.toLowerCase();
        const allowed = roles.map(r => r.toLowerCase());

        if (!allowed.includes(userRole)) {
            return res.status(402).json({
                success: false,
                message: "Access denied",
            });
        }
        next();
    };
};
