import { Router } from "express";
import { CreatePatrimonioController } from "../modules/patrimonio/createPatrimonio/CreatePatrimonioController";
import { ensureAuthPermissao } from "../middlewares/ensureAuthPermissao";
import { GetPatrimonioByIdController } from "../modules/patrimonio/getPatrimonioById/GetPatrimonioByIdController";
import { CadastrarBaixaPatrController } from "../modules/patrimonio/baixaPatrimonio/CadastrarBaixaPatrController";
import { EditPatrimonioController } from "../modules/patrimonio/editPatrimonio/EditPatrimonioController";
import { GetAllPatrimoniosController } from "../modules/patrimonio/getAllPatrimonios/GetAllPatrimoniosController";
import { SearchPatrimonioController } from "../modules/patrimonio/searchPatrimonio/SearchPatrimonioController";
import { GetPatrByIdEditedController } from "../modules/patrimonio/getPatrimonioByIdEdited/GetPatrimonioByIdEditedController";
import { GetPatrimonioByPlacaController } from "../modules/patrimonio/getPatrimonioByPlaca/GetPatrimonioByPlacaController";
import { EditLocalizacaoPatrController } from "../modules/patrimonio/editLocalizacaoPatr/EditLocalizacaoController";
import { GetPatrimoniosRuinsController } from "../modules/patrimonio/getPatrimoniosRuins/GetPatrimoniosRuinsController";

export const patrimonioRoutes = Router()

const createPatrimonioController = new CreatePatrimonioController
const getPatrimonioByIdController = new GetPatrimonioByIdController
const cadastrarBaixaPatrController = new CadastrarBaixaPatrController
const editPatrimonioController = new EditPatrimonioController
const getAllPatrimoniosController = new GetAllPatrimoniosController
const searchPatrimonioController = new SearchPatrimonioController
const getPatrByIdEditedController = new GetPatrByIdEditedController
const getPatrByPlacaController = new GetPatrimonioByPlacaController
const editLocalizacaoPatrController = new EditLocalizacaoPatrController
const getPatrimoniosRuinsController = new GetPatrimoniosRuinsController

patrimonioRoutes.post('/create', (req, res, next) => {
    createPatrimonioController.handle(req, res, next)
})

patrimonioRoutes.put('/update/:id', (req, res, next) => {
    editPatrimonioController.handle(req, res, next)
})

patrimonioRoutes.patch('/update-loc/:id', (req, res, next) => {
    editLocalizacaoPatrController.handle(req, res, next)
})

patrimonioRoutes.get('/get-all', (req, res, next) => {
    getAllPatrimoniosController.handle(req, res, next)
})

patrimonioRoutes.get('/get/:id', (req, res, next) => {
    getPatrimonioByIdController.handle(req, res, next)
})

patrimonioRoutes.get('/get-names/:id', (req, res, next) => {
    getPatrByIdEditedController.handle(req, res, next)
})

patrimonioRoutes.get('/get-placa/:placa', (req, res, next) => {
    getPatrByPlacaController.handle(req, res, next)
})

patrimonioRoutes.get('/get-all-ruins', (req, res, next) => {
    getPatrimoniosRuinsController.handle(req, res, next)
})

patrimonioRoutes.delete('/baixa/:id', (req, res, next) => {
    cadastrarBaixaPatrController.handle(req, res, next)
})

patrimonioRoutes.get('/search', (req, res, next) => {
    searchPatrimonioController.handle(req, res, next)
})