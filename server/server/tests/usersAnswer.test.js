const request = require('supertest');
const User = require('../model/user.model');
const Question = require('../model/question.model');
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
let question = ''

beforeAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
    const response = await request(app).post('/signUp').send(user);
    userId = response.body._id
    const login = await request(app).post('/signIn').send({
        email: user.email,
        password: user.password
    });
    accessToken = login.body.accessToken;
    User.findByIdAndUpdate(userId, { isAdmin: true });
    question = await Question.create({
        "questionName": "Sample Question",
        "tenant": "Question for tenant?",
        "landlord": "Question for landlord?"
    });
});
  
afterAll(async () => {
    await User.findOneAndDelete({ email: 'cupi@gmail.com' });
    await Question.findByIdAndDelete(question._id);
});

describe('Test Answers Methods', () => {
    let newAnswer;
    test('test create answer', async () => {
        let sendVal = [
            {
                "questionId": question._id,
                "user": userId,
                "value": 1,
                "priority": 1
            }
        ];
        const response = await request(app).post('/user-answer').send(sendVal).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(201)
    });
    test('test get all answers of current user', async () => {
        const response = await request(app).get('/user-answer').send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
        newAnswer = response.body[0];
    });
    test('test get answer by id', async () => {
        const response = await request(app).get(`/user-answer/${newAnswer._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test update answer', async () => {
        const response = await request(app).put(`/user-answer/${newAnswer._id}`).send({
            answer: 0
        }).set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(200)
    });
    test('test delete answer', async () => {
        const response = await request(app).delete(`/user-answer/${newAnswer._id}`).send().set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toEqual(204)
    });
});