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

describe('Test Questions Methods', () => {
    let newQuestion;
    test('test create question', async () => {
        const response = await request(app).post('/question').send({
            "questionName": "Sample Question",
            "tenant": "Question for tenant?",
            "landlord": "Question for landlord?"
          }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(201)
        newQuestion = response.body;
    });
    test('test get all questions', async () => {
        const response = await request(app).get('/question').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test get question by id', async () => {
        const response = await request(app).get(`/question/${newQuestion._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test update question', async () => {
        const response = await request(app).put(`/question/${newQuestion._id}`).send({
            questionName: 'worked'
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test delete question', async () => {
        const response = await request(app).delete(`/question/${newQuestion._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});