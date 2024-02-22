import { Router } from "express";
import { CreateLocalizacaoController } from "../modules/localizacao/createLocalizacao/CreateLocalizacaoController";
import { GetLocByIdController } from "../modules/localizacao/getLocalizacaoById/GetLocByIdController";
import { GetAllLocalizacoesController } from "../modules/localizacao/getAllLocalizacoes/GetAllLocalizacoesController";
import { DeleteLocalizacaoController } from "../modules/localizacao/deleteLocalizacao/DeleteLocalizacaoController";
import { ensureAuthPermissao } from "../middlewares/ensureAuthPermissao";
import { EditLocalizacaoController } from "../modules/localizacao/editLocalizacao/EditLocalizacaoController";

export const localizacaoRoutes = Router()

const createLocalizacaoController = new CreateLocalizacaoController
const getLocByIdController = new GetLocByIdController
const getAllLocalizacoesController = new GetAllLocalizacoesController
const deleteLocalizacaoController = new DeleteLocalizacaoController
const editLocalizacaoController = new EditLocalizacaoController

localizacaoRoutes.get('/get/:id', (req, res, next) => {
    getLocByIdController.handle(req, res, next)
})

localizacaoRoutes.get('/get-all', (req, res, next) => {
    getAllLocalizacoesController.handle(req, res, next)
})

localizacaoRoutes.use(ensureAuthPermissao('ADMINISTRADOR'))

localizacaoRoutes.post('/create', (req, res, next) => {
    createLocalizacaoController.handle(req, res, next)
})

localizacaoRoutes.put('/update/:id', (req, res, next) => {
    editLocalizacaoController.handle(req, res, next)
})

localizacaoRoutes.delete('/delete/:id', (req, res, next) => {
    deleteLocalizacaoController.handle(req, res, next)
})