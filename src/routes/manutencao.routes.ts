import { Router } from "express";
import { CreateManutencaoController } from "../modules/manutencao/createManutencao/CreateManutencaoController";
import { GetManutencaoByIdController } from "../modules/manutencao/getManutencaoById/GetManutencaoByIdController";
import { GetManutencaoByPatrController } from "../modules/manutencao/GetManutencaoByPatr/GetManutencaoByPatrController";
import { GetManutencaoByPrestadorController } from "../modules/manutencao/getManutencaoByPrestador/GetManutencaoByPrestadoController";
import { BaixaManutencaoController } from "../modules/manutencao/baixaManutencao/BaixaManutencaoController";
import { DeleteManutencaoController } from "../modules/manutencao/deleteManutencao/DeleteManutencaoController";
import { GetAllManutencoesController } from "../modules/manutencao/getAllManutencoes/GetAllManutencoesController";
import { ensureAuthPermissao } from "../middlewares/ensureAuthPermissao";
import { GetManutencoesAtivasController } from "../modules/manutencao/GetManutencoesAtivas/GetManutencoesAtivasController";

export const manutencaoRoutes = Router()

const createManutencaoController = new CreateManutencaoController
const getManutencaoByIdController = new GetManutencaoByIdController
const getManutecoesByIdPatrController = new GetManutencaoByPatrController
const getManutencaoByPrestadorController = new GetManutencaoByPrestadorController
const baixaManutencaoController = new BaixaManutencaoController
const deleteManutencaoController = new DeleteManutencaoController
const getAllManutencoesController = new GetAllManutencoesController
const getManutencoesAtivasController = new GetManutencoesAtivasController

manutencaoRoutes.post('/create/:id_patrimonio', (req, res, next) => {
    createManutencaoController.handle(req, res, next)
})

manutencaoRoutes.put('/baixa/:id', (req, res, next) => {
    baixaManutencaoController.handle(req, res, next)
})

manutencaoRoutes.get('/get/:id', (req, res, next) => {
    getManutencaoByIdController.handle(req, res, next)
})

manutencaoRoutes.get('/get/patr/:placa', (req, res, next) => {
    getManutecoesByIdPatrController.handle(req, res, next)
})

manutencaoRoutes.get('/get/prestador/:id_prestador', (req, res, next) => {
    getManutencaoByPrestadorController.handle(req, res, next)
})

manutencaoRoutes.get('/get-all', (req, res, next) => {
    getAllManutencoesController.handle(req, res, next)
})

manutencaoRoutes.get('/get-ativas', (req, res, next) => {
    getManutencoesAtivasController.handle(req, res, next)
})

manutencaoRoutes.delete('/delete/:id', ensureAuthPermissao('ADMINISTRADOR'), (req, res, next) => {
    deleteManutencaoController.handle(req, res, next)
})