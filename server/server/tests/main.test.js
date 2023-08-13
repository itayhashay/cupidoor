const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../main.js'); // Update the path accordingly
require("dotenv").config();

let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = process.env.MONGOURI;
  
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
  
  describe('App Tests', () => {
    test('Swagger Documentation', async () => {
        const response = await request(app).get('/api-docs');
        expect(response.statusCode).toBe(301); // Assuming OK status
        // Add more assertions for the response data
    });
  
    // Add more tests to cover other aspects of your app setup and behavior
  });