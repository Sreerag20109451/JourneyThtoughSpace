"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.neoRouter = void 0;
const express_1 = require("express");
const neocontroller_1 = require("../controller/neocontroller");
exports.neoRouter = (0, express_1.Router)();
exports.neoRouter.get("/feed", neocontroller_1.neoFeed);
exports.neoRouter.get("/lookup/:id", neocontroller_1.lookupNeo);
exports.neoRouter.get("/browse/", neocontroller_1.browseNeo);
