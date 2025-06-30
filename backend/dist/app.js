"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const neorouter_1 = require("./routers/neorouter");
const dotenv_1 = __importDefault(require("dotenv"));
const async_handler_express_1 = require("async-handler-express");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(async_handler_express_1.errorHandler);
exports.app.use("/api/neo", neorouter_1.neoRouter);
exports.app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
