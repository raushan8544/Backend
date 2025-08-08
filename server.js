const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authR");
const assetRoutes = require("./routes/assetR");
const operatorRoutes = require("./routes/opratorR");
require("dotenv").config();

 app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
 }))

app.use(express.json());
app.use(cookieParser());

connectDB.connect();

app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/operators', operatorRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> 
    console.log(`Server is running on port ${PORT}`)
);