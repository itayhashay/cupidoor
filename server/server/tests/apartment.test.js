const request = require('supertest');
const User = require('../model/user.model');
const app = require('../main.js'); // Update the path accordingly

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
    "totalPrice": 1650,
    "images": [
      {
        "name": "Living Room",
        "url": "https://example.com/living-room.jpg"
      },
      {
        "name": "Bedroom",
        "url": "https://example.com/bedroom.jpg"
      }
    ]
  }

const user = {
    firstName: 'cupidoor',
    lastName: 'test',
    age: 27,
    phone: '123456676',
    email: 'cupi@gmail.com',
    password: '123456'
}
let accessToken = ''
let userId = ''

beforeAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
    const response = await request(app).post('/signUp').send(user);
    userId = response.body._id
    const login = await request(app).post('/signIn').send({
        email: user.email,
        password: user.password
    });
    accessToken = login.body.accessToken;
    await User.findByIdAndUpdate(userId, { isAdmin: true });
});
  
afterAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
});

describe('Test Apartment Methods', () => {
    let newApartment;
    test('test create apartment', async () => {
        const response = await request(app).post('/apartment').send(apartment).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(201)
        newApartment = response.body;
    });
    test('test get all apartments', async () => {
        const response = await request(app).get('/apartment').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get all apartments by landlord', async () => {
        const response = await request(app).get(`/apartment/landlord/${userId}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get apartment by id', async () => {
        const response = await request(app).get(`/apartment/${newApartment._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test update apartment', async () => {
        const response = await request(app).put(`/apartment/${newApartment._id}`).send({
            city: 'Rosh Haayin'
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test delete apartment', async () => {
        const response = await request(app).delete(`/apartment/${newApartment._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});