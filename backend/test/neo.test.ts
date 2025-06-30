import { Request, Response } from "express";

import request from 'supertest';
import { app  } from "../app";


const server = app


describe("Test NEO API Endpoints", () => {


    it("GET /api/neo/browse should return NEO browse data", async () => {
        const response = await request(server).get("/api/neo/browse");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("near_earth_objects");
    })


})