import { Router } from "express";
import { CreateCategoriaController } from "../modules/categoria/createCategoria/CreateCategoriaController";
import { GetCategoriaByIdController } from "../modules/categoria/getCategoriaById/GetCategoriaByIdController";
import { GetAllCategoriasController } from "../modules/categoria/getAllCategorias/GetAllCategoriasController";
import { DeleteCategoriaController } from "../modules/categoria/deleteCategoria/DeleteCategoriaController";
import { ensureAuthPermissao } from "../middlewares/ensureAuthPermissao";

export const categoriaRoutes = Router()

const createCategoriaController = new CreateCategoriaController
const getCategoriaByIdController = new GetCategoriaByIdController
const getAllCategoriasController = new GetAllCategoriasController
const deleteCategoriaController = new DeleteCategoriaController

categoriaRoutes.get('/get/:id', (req, res, next) => {
    getCategoriaByIdController.handle(req, res, next)
})

categoriaRoutes.get('/get-all', (req, res, next) => {
    getAllCategoriasController.handle(req, res, next)
})

categoriaRoutes.use(ensureAuthPermissao('ADMINISTRADOR'))

categoriaRoutes.post('/create', (req, res, next) => {
    createCategoriaController.handle(req, res, next)
})

categoriaRoutes.delete('/delete/:id', (req, res, next) => {
    deleteCategoriaController.handle(req, res, next)
})