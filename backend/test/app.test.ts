import { Request, Response } from "express";

const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req : Request, res : Response) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err : Error, res : Response) {
    if (err) throw err;
  });