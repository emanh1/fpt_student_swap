import express from "express";
import cors from "cors";
import db from "./app/models/index.js"; 
import swapRoutes from "./app/routes/swap.routes.js"; 
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

swapRoutes(app);

db.sequelize.sync().then(() => {
    console.log("Database synced successfully.");
}).catch((err) => {
    console.error("Failed to sync database:", err);
});

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
