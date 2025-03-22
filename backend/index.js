const express = require('express');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {app,server, io} = require("./socket/socket")

dotenv.config();
// const app = express();


app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);



connectDB();

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});