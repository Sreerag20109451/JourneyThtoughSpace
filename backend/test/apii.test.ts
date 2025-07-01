import { Request, Response } from "express";

import request from 'supertest';
import { app  } from "../app";


const server = app


describe("Test NEO Browse Endpoints", () => {


    it("GET /api/neo/browse should return NEO browse data", async () => {
        const response = await request(server).get("/api/neo/browse");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("near_earth_objects");
    })
  
})


describe("Test Lookup Endpoints", ()=>{

    it("GET /api/neo/lookup with an Id param should get the same neo objecr", async () =>{
        const response = await request(server).get("/api/neo/lookup/2002062")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("links")
        expect(response.body).toHaveProperty("id", "2002062")
    })

    it("GET /api/neo/lookup fails with 404 on an invalid id", async () =>{
        const response = await request(server).get("/api/neo/lookup/hj")
        expect(response.status).toBe(404)
    })

})


describe("Test feed endpoints", () =>{


    it("GET /api/neo/feed with an start dtm and end dtm gives positive response", async () =>{
        const response = await request(server).get("/api/neo/feed?start_date=2015-09-07&end_date=2015-09-08")
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("links")
        expect(response.body.element_count).toBeGreaterThanOrEqual(1)
    })


    it("GET /api/neo/feed fails with 403 on invalid range of start and end dtm", async () =>{
        const response = await request(server).get("/api/neo/feed?start_date=2015-09-07&end_date=2015-10-08")
        expect(response.status).toBe(403)
  
    })




})