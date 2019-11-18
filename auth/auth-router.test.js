
const request = require('supertest');
const server = require('../api/server');
const db = require('../database/db-config');
const Users = require("../users/users-model");

describe('post article fails with no auth', () => {
    it('requires authentication', () => {
        const newArticle = {
            article_label: "new article",
            url: "url",
            board_id: 1
        }
        return request(server)
        .post('/articles')
        .send({newArticle})
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})

describe('authorization', () => {
    beforeEach(async () => {
        await db("users").truncate();
    });

    it('should register with status 201', () => {
        return request(server)
        .post('/auth/register')
        .send({
            username: 'username',
            password: 'password'
        })
        .then(res => {
            expect(res.status).toBe(201);
        });
    });

    it('fails if no username provided', () => {
        const newUser = {
            username: "",
            password: "password"
        }

        return request(server)
        .post('/auth/register')
        .send(newUser)
        .then(res => {
            expect(res.status).toBe(400)
        });
    })
});

describe('POST auth/login', () => {
    beforeEach(() => {
        return request(server)
        .post('/auth/register')
        .send({
            username: "username",
            password: "password"
        });
    });

    it('should login successfully', () => {
        return request(server)
        .post('/auth/login')
        .send({
            username: "username",
            password: "password"
        })
        .then(res => {
            expect(res.status).toBe(200)
        });
    })

    it('should login with status 400', () => {
        const newUser = {
            username: "admin",
            password: "password"
        }

        return request(server)
        .post('/auth/login')
        .send(newUser)
        .then(res => {
            expect(res.status).toBe(400);
        });
    })
})



