import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app";

describe('should test all categorias routes', () => {
    let token: string
    let id_cat: string

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '123456' })

        token = res.body.token
    })

    test('should create a categoria successfully', async () => {
        return request(app)
            .post('/categoria/create')
            .set('authorization', `Bearer ${token}`)
            .send({ descricao: `Cat-Test-${Math.ceil(Math.random() * 1000)}` })
            .expect(201)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
                id_cat = res.body.data.id
            })
    })

    test('should get a categoria by his id successfully', async () => {
        return request(app)
            .get(`/categoria/get/${id_cat}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get all categorias successfully', async () => {
        return request(app)
            .get(`/categoria/get-all`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get a categoria with a query by descricao successfully', async () => {
        return request(app)
            .get(`/categoria/get-all?descricao=Eletrônicos`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should delete a categoria successfully', async () => {
        return request(app)
            .delete(`/categoria/delete/${id_cat}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })
})