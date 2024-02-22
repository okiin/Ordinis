import { describe, test, beforeAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { AppError } from '../errors/AppError'

describe('should test all sessao routes', () => {

    test('should do the login successfully', async () => {
        return request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '123456' })
            .expect(200)
            .then((res) => {
                expect(res.body.token).toBeTypeOf('string')
            })
    })

    test('should give an error by passing a wrong body when doing login', async () => {
        return request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '12' })
            .expect(400)
            .catch((res) => {
                expect(res).toBeInstanceOf(AppError)
            })
    })

    test('should give an error by passing a invalid email when doing login', async () => {
        return request(app)
            .post('/login')
            .send({ email: 'invalid@email.com', senha: '123456' })
            .expect(400)
            .catch((res) => {
                expect(res).toBeInstanceOf(AppError)
            })
    })

    test('should give an error by passing a invalid password when doing login', () => {
        return request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '1234567' })
            .expect(400)
            .catch((res) => {
                expect(res).toBeInstanceOf(AppError)
            })
    })
})