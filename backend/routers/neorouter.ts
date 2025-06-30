import { Router } from "express";
import {  browseNeo, lookupNeo, neoFeed } from "../controller/neocontroller";

export const neoRouter: Router = Router();

neoRouter.get("/feed", neoFeed)
neoRouter.get("/lookup/:id", lookupNeo);
neoRouter.get("/browse/", browseNeo);