const server = require('./server.js')
const request = require('supertest');

describe('GET /', () => {
        it('should return "we up" at root endpoint', () => {  
            return request(server)
                .get('/')
                .expect({message: "we up"})           
        })
})

describe('server', () => {
        it('should be in testing environment', () => {
          expect(process.env.DB_ENV).toBe('testing');
        });
})    