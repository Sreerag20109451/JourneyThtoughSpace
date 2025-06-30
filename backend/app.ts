import express from "express";
import { neoRouter } from "./routers/neorouter";
import dotenv from "dotenv";
import { errorHandler } from "async-handler-express";
import cors from "cors";

dotenv.config();

export const app: express.Application = express();


const port =  process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use("/api/neo", neoRouter);


app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});


 