const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.resister = async(req, res)=>{
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                success: false,
                message: "all field required"
            })
        }
        const existingUser = await User.findOne({email, role});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            role
        });
         
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    }
    catch (error){
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

 
exports.Login = async(req, res)=>{
     try {
        const {email, password,role} =req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                success: false,
                message: "all field required"
            })
        }
        const user = await User.findOne({email, role});
        if(!user ){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if( !isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "incorrect password"
            })
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res.status(200).json({
            success: true,
            message: "login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

     }
     catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "login failed",
        });

     }
}
