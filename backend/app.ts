import express from "express";
import { neoRouter } from "./routers/neorouter";

import dotenv from "dotenv";
import { errorHandler } from "async-handler-express";

dotenv.config();

export const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use("/api/neo", neoRouter);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


 