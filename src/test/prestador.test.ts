import { describe, beforeAll, test, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Should test all prestador routes', () => {
    let token: string
    let prestador = {
        nome: 'Test',
        sobrenome: 'Prestador',
        descricao: 'Responsável por testar o software 😁',
        telefone: '16123456789',
        rua: 'Rua suit test',
        numero: 123,
        bairro: 'Bairro dos testes'
    }
    let id_prest: string

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '123456' })

        token = res.body.token
    })

    test('should create a prestador successfully', async () => {
        return request(app)
            .post('/prestador/create')
            .set('authorization', `Bearer ${token}`)
            .send(prestador)
            .expect(201)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
                id_prest = res.body.data.id
            })
    })

    test('should update a prestador successfully', async () => {
        return request(app)
            .put(`/prestador/update/${id_prest}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                ...prestador,
                sobrenome: 'Edited'
            })
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get prestador by his id successfully', async () => {
        return request(app)
            .get(`/prestador/get/${id_prest}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get all prestadores', async () => {
        return request(app)
            .get(`/prestador/get-all`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })
})