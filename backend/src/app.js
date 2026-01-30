import express from "express";
import session from "express-session";
import { connectDB } from "../config/db.js";
import MongoStore from "connect-mongo";
import cors from "cors"

import lmsRoutes from './api/lms/routes/index.js';
import careerRoutes from './api/career/routes/index.js';
import authRoutes from './api/auth/routes/index.js';

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
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
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

app.use("/api/auth", authRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/lms", lmsRoutes);


connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});