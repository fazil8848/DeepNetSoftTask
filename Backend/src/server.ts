import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js"; // Use `.js` since Node.js will look for the transpiled file.

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();

console.log(process.env.PHASE === "DEV");

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins =
        process.env.PHASE === "DEV"
          ? [process.env.LOCAL_CLIENT_URL, `${process.env.LOCAL_CLIENT_URL}/`]
          : [
              process.env.GLOBAL_CLIENT_URL,
              `${process.env.GLOBAL_CLIENT_URL}/`,
            ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/api/menus", menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
