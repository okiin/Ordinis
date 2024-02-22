import { describe, test, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../app";

describe('Should test all manutenção routes', () => {
    const id_prestador: string = '48ca6878-6fa1-4261-a327-e8064dbb8f4f'
    const id_patrimonio: string = '4f2f6eea-8f77-48bc-a06d-46b09654135e'

    const manutencao = {
        descricao: 'Manutenção teste automatizado.',
        data_inicio: Date.now(),
        data_fim: Date.now(),
        valor: 999.9,
        id_prestador
    }

    let token: string
    let id_man: string

    beforeAll(async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'adm@dev.com', senha: '123456' })

        token = res.body.token
    })

    test('Should create a manutenção successfully', async () => {
        return request(app)
            .post(`/manutencao/create/${id_patrimonio}`)
            .set('authorization', `Bearer ${token}`)
            .send(manutencao)
            .expect(201)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
                id_man = res.body.data.id
            })
    })

    test('should shutdown manutenção successfully', async () => {
        return request(app)
            .put(`/manutencao/baixa/${id_man}`)
            .set('authorization', `Bearer ${token}`)
            .send({ data_fim: Date.now() })
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get a manutenção by id successfully', async () => {
        return request(app)
            .get(`/manutencao/get/${id_man}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get manutenções by Placa patrimonio successfully', async () => {
        return request(app)
            .get(`/manutencao/get/patr/PC-0001`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get manutenções by id prestador successfully', async () => {
        return request(app)
            .get(`/manutencao/get/prestador/${id_prestador}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get all manutencões successfully', async () => {
        return request(app)
            .get(`/manutencao/get-all`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should get all manutenções activateds successfully', async () => {
        return request(app)
            .get(`/manutencao/get-ativas`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })

    test('should delete a manutencao successfully', async () => {
        return request(app)
            .delete(`/manutencao/delete/${id_man}`)
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                expect(res.body.success).toBeTruthy()
            })
    })
})