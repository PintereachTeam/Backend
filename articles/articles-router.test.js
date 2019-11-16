const request = require('supertest');
const articles = require('./articles-model')

describe('delete article endpoint', () => {
    it('should delete the with provided id', () => {
        articles.remove(1);
        return articles.findById(1).then(res => {
            expect(res).toBe(undefined)
        })
    })
})