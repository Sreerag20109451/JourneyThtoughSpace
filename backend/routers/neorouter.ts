import { Router } from "express";

export const neoRouter: Router = Router();

neoRouter.get("/", (req, res) => {


    res.send("Hehehe, this is the NeoRouter endpoint!");
})