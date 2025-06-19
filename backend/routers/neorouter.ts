import { Router } from "express";
import { getNeoFeed } from "../controller/neocontroller";

export const neoRouter: Router = Router();

neoRouter.get("/", getNeoFeed)