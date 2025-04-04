import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user from './routes/adminRoute.js';
import path from 'path';
const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();
dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173", "https://easy-trip-smoky.vercel.app"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use('/api/upload', user);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}
app.use("/", (req, res) => {
    res.json("Api started");
});
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
}
);