import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import session from "express-session";
import { connectDB } from "../config/db.js";
import MongoStore from "connect-mongo";
import cors from "cors"

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "MuEHeheEHe",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60 
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});