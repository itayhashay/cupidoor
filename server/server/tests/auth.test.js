const request = require('supertest');
const User = require('../model/user.model');
const app = require('../main.js'); // Update the path accordingly


beforeAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
});
  
afterAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
});

describe('Test Authentications Methods', () => {
    const user = {
        firstName: 'cupidoor',
        lastName: 'test',
        age: 27,
        phone: '123456676',
        email: 'cupi@gmail.com',
        password: '123456'
    }
    let accessToken = ''
    let refreshToken = ''
    let userId = ''
    test('test registration', async () => {
        const response = await request(app).post('/signUp').send(user);
        expect(response.statusCode).toEqual(200)
        userId = response.body._id
    });
    test('test sign in', async () => {
        const response = await request(app).post('/signIn').send({
            email: user.email,
            password: user.password
        });
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken;
        refreshToken = response.headers['set-cookie'][0].match(/jwt=([^;]+)/)[1];
    });
    test('test refresh token', async () => {
        const response = await request(app).get('/refresh').send().set('Cookie', `jwt=${refreshToken}`).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test log out', async () => {
        const response = await request(app).get('/signout').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});