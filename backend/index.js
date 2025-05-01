import express from "express";
import cors from "cors";
import db from "./app/models/index.js"; 
import swapRoutes from "./app/routes/swap.routes.js"; 
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import authRoutes from "./app/routes/auth.routes.js";
import configurePassport from "./app/config/passport.config.js";

dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
configurePassport();

app.get("/", (req, res) => {
    res.json({ message: "OK" });
});

authRoutes(app);
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
