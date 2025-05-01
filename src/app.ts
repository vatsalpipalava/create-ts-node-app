import express from "express";
import cors from "cors";

import morganMiddleware from "@/middlewares/logging";
import { corsOptions } from "@/config/options";

const app = express();

app.use(morganMiddleware);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "10mb" }));

// <----------------- Routers ------------------->
import healthRoutes from "@/routes/health.routes";

app.use("/api/v1/health", healthRoutes);

export { app };
