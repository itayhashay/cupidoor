const request = require('supertest');
const User = require('../model/user.model');
const app = require('../main.js'); // Update the path accordingly
const Apartment = require('../model/apartment.model');

const apartment = {
    "description": "Spacious apartment with a beautiful view",
    "propertyCondition": "Good",
    "user": "64ce2584c27eaca96d2884be",
    "city": "New York",
    "street": "Main Street",
    "houseNumber": "123",
    "floor": 5,
    "rooms": 3,
    "elevator": true,
    "houseArea": "120 sqm",
    "parkings": 1,
    "balconies": 1,
    "entranceDate": "2023-07-18",
    "furnished": true,
    "bars": false,
    "boiler": true,
    "airConditioner": true,
    "accessible": true,
    "garage": false,
    "shelter": true,
    "longTerm": true,
    "numOfPayments": 12,
    "paymentDay": 1,
    "price": 1500,
    "committee": 100,
    "tax": 50,
    "totalPrice": 1650
  }

const user = {
    firstName: 'cupidoor1',
    lastName: 'test',
    age: 27,
    phone: '123456676',
    email: 'cupi1@gmail.com',
    password: '123456'
}
const user2 = {
    firstName: 'cupidoor2',
    lastName: 'test',
    age: 27,
    phone: '123456676',
    email: 'cupi2@gmail.com',
    password: '123456'
}
let accessToken = ''
let user1Id = ''
let user2Id = ''
let apartmentId = '';

beforeAll(async () => {
    await User.findOneAndDelete({ email: 'cupi1@gmail.com' });
    await User.findOneAndDelete({ email: 'cupi2@gmail.com' });
    const responseUser1 = await request(app).post('/signUp').send(user);
    const responseUser2 = await request(app).post('/signUp').send(user2);
    user1Id = responseUser1.body._id
    user2Id = responseUser2.body._id
    const login = await request(app).post('/signIn').send({
        email: user.email,
        password: user.password
    });
    accessToken = login.body.accessToken;
    const responseApartment = await request(app).post('/apartment').send(apartment).set('Authorization', `Bearer ${accessToken}`);
    apartmentId = responseApartment.body._id;
},15000);
  
afterAll(async () => {
    await User.findOneAndDelete({ email: 'cupi1@gmail.com' });
    await User.findOneAndDelete({ email: 'cupi2@gmail.com' });
    await Apartment.findByIdAndDelete(apartmentId);
});

describe('Test Score Methods', () => {
    let newScore;
    test('test create score', async () => {
        const response = await request(app).post('/score').send({
            tenant: user2Id,
            landlord: user1Id,
            apartment: apartmentId,
            score: 50
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(201)
        newScore = response.body;
    });
    test('test get all scores', async () => {
        const response = await request(app).get('/score').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get score by id', async () => {
        const response = await request(app).get(`/score/${newScore._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test update score', async () => {
        const response = await request(app).put(`/score/${newScore._id}`).send({
            score: 55
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test delete score', async () => {
        const response = await request(app).delete(`/score/${newScore._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});