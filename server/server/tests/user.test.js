const request = require('supertest');
const User = require('../model/user.model');
const app = require('../main.js'); // Update the path accordingly

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

describe('Test Authentications Methods', () => {
    let newUser;
    test('test create user', async () => {
        const response = await request(app).post('/user').send({
            firstName: 'test',
            lastName: 'test',
            age: 27,
            phone: '123456676',
            email: 'cupitest@gmail.com',
            password: '123456'
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(201)
        newUser = response.body;
    });
    test('test get current user', async () => {
        const response = await request(app).get('/user').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get all users', async () => {
        const response = await request(app).get('/user/all').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get user by id', async () => {
        const response = await request(app).get(`/user/${newUser._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test update user', async () => {
        const response = await request(app).put(`/user/${newUser._id}`).send({
            firstName: 'worked'
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test delete user', async () => {
        const response = await request(app).delete(`/user/${newUser._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});