const request = require('supertest');
const User = require('../model/user.model');
const app = require('../main.js'); // Update the path accordingly
const Apartment = require('../model/apartment.model');
const Score = require('../model/score.model');

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
let accessToken1 = ''
let accessToken2 = ''
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
    const login1 = await request(app).post('/signIn').send({
        email: user.email,
        password: user.password
    });
    const login2 = await request(app).post('/signIn').send({
        email: user2.email,
        password: user2.password
    });
    accessToken1 = login1.body.accessToken;
    accessToken2 = login2.body.accessToken;
    const responseApartment = await request(app).post('/apartment').send(apartment).set('Authorization', `Bearer ${accessToken2}`);
    apartmentId = responseApartment.body._id;
},15000);
  
afterAll(async () => {
    await User.findOneAndDelete({ email: 'cupi1@gmail.com' });
    await User.findOneAndDelete({ email: 'cupi2@gmail.com' });
    await Score.deleteMany({ apartment: apartmentId });
    await Score.deleteMany({ landlord: user2Id });
    await Apartment.findByIdAndDelete(apartmentId);
});

describe('Test User Relations Methods', () => {
    test('test create like', async () => {
        const response = await request(app).post(`/users-relations/tenant/like/${apartmentId}`).send().set('Authorization', `Bearer ${accessToken1}`);
        expect(response.statusCode).toEqual(201)
    });
    test('test get all likes as tenant', async () => {
        const response = await request(app).get('/users-relations/tenant/likes').send().set('Authorization', `Bearer ${accessToken1}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get all likes of apartment', async () => {
        const response = await request(app).get(`/users-relations/apartment/likes/${apartmentId}`).send().set('Authorization', `Bearer ${accessToken2}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test create match', async () => {
        const response = await request(app).post(`/users-relations/apartment/match/${user1Id}`).send({
            apartmentId
        }).set('Authorization', `Bearer ${accessToken2}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get all matches as tenant', async () => {
        const response = await request(app).get(`/users-relations/tenant/matches/${user1Id}`).send().set('Authorization', `Bearer ${accessToken1}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get all matches of apartment', async () => {
        const response = await request(app).get(`/users-relations/apartment/matches/${apartmentId}`).send().set('Authorization', `Bearer ${accessToken2}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test create decline', async () => {
        const response = await request(app).post(`/users-relations/apartment/match/${user1Id}`).send({
            apartmentId
        }).set('Authorization', `Bearer ${accessToken2}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test unlike', async () => {
        const response = await request(app).post(`/users-relations/tenant/like/${apartmentId}`).send().set('Authorization', `Bearer ${accessToken1}`);
        expect(response.statusCode).toEqual(201)
    });
});