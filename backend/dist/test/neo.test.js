"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const server = app_1.app;
describe("Test NEO API Endpoints", () => {
    it("GET /api/neo/browse should return NEO browse data", async () => {
        const response = await (0, supertest_1.default)(server).get("/api/neo/browse");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("near_earth_objects");
    });
});
