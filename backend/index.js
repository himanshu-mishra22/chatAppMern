const express = require('express');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);



connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});