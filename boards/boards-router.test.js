const request = require('supertest');
const Boards = require('./boards-model')
const server = require('../api/server')


describe('adds new board', () => {

    it('requires auth', () => {
        const newBoard = {
            board_title: "new board",
            user_id: 1
        }
        return request(server)
        .post('/boards')
        .send({newBoard})
        .then(res => {
            expect(res.status).toBe(401)
        })
    })
})


describe('delete board', () => {
    it('should delete board by id', () => {
        Boards.remove(1);
        return Boards.findById(1).then(res => {
            expect(res).toBe(undefined)
        })
    })
})