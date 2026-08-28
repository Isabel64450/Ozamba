import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { authRouter } from "./routes/auth.router.js";
import { initDependencies } from "./dependencies/initDependencies.js";
import getPool from "./config/base.pool.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});


const app = express();
const pool = getPool();
app.use(cors({
  origin:`${process.env.CLIENT_FRONT}`, 
  credentials: true,            
}))
app.use(express.json());

const {authController}=initDependencies(pool)
app.use("/auth", authRouter(authController))

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});