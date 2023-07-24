import express from "express";
import { PORT } from "./config/serverConfig.js";
import apiRoutes from "./routes/index.js";
import dbConnect from "./config/dbConnect.js";
import { globalErrorHandler } from "./middlewares/index.js";
import cors from "cors";
// import corsOptions from "./config/corsConfig.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api", apiRoutes);

// error handlers
app.use(globalErrorHandler);

// listen to server
app.listen(PORT, async () => {
  console.log(`Server is listening at port ${PORT}`);
  await dbConnect();
});
