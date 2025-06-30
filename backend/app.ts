import express from "express";
import { neoRouter } from "./routers/neorouter";
import dotenv from "dotenv";
import { errorHandler } from "async-handler-express";
import cors from "cors";

dotenv.config();

export const app: express.Application = express();


const allowedOrigins = [
  'http://localhost:5173/' 
];

const port =  process.env.PORT || 3000

app.use(cors({
  origin : allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],

}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use("/api/neo", neoRouter);


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


 