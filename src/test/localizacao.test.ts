import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app";

describe('should test all localizacao routes', () => {
    let token: string
    let id_loc: string
    let localizacao = {
        descricao: `Loc-Test-${Math.ceil(Math.random() * 1000)}`
    }

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '123456' })

        token = res.body.token
    })

    test('should create a localização successfully', async () => {
        return request(app)
            .post('/localizacao/create')
            .set('authorization', `Bearer ${token}`)
            .send(localizacao)
            .expect(201)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
                id_loc = res.body.data.id
            })
    })

    test('should get a localizacao by his id successfully', async () => {
        return request(app)
            .get(`/localizacao/get/${id_loc}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should edit a localizacao successfully', async () => {
        return request(app)
            .put(`/localizacao/update/${id_loc}`)
            .set('authorization', `Bearer ${token}`)
            .send({ descricao: `Edited-${localizacao.descricao}` })
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get all localizacoes successfully', async () => {
        return request(app)
            .get(`/localizacao/get-all`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get a localizacão with a query by descricao successfully', async () => {
        return request(app)
            .get(`/localizacao/get-all?descricao=Sala 01`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should delete a localizacao successfully', async () => {
        return request(app)
            .delete(`/localizacao/delete/${id_loc}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })
})