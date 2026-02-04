import express from "express";
import complaintRoutes from "./routes/complaint.routes.js";
import logger from "./middleware/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/complaints", complaintRoutes);

export default app;
