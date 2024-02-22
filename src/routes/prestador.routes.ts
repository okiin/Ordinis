import { Router } from "express";
import { CreatePrestadorController } from "../modules/prestador/createPrestador/CreatePrestadorController";
import { GetPrestadorByIdController } from "../modules/prestador/getPrestadorById/GetPrestadorByIdController";
import { GetAllPrestadoresController } from "../modules/prestador/getAllPrestadores/GetAllPrestadoresController";
import { EditPrestadorController } from "../modules/prestador/editPrestador/EditPrestadorController";

export const prestadorRoutes = Router()

const createPrestadorController = new CreatePrestadorController
const getPrestadorByIdController = new GetPrestadorByIdController
const getAllPrestadoresController = new GetAllPrestadoresController
const editPrestadorController = new EditPrestadorController

prestadorRoutes.post('/create', (req, res, next) => {
    createPrestadorController.handle(req, res, next)
})

prestadorRoutes.put('/update/:id', (req, res, next) => {
    editPrestadorController.handle(req, res, next)
})

prestadorRoutes.get('/get/:id', (req, res, next) => {
    getPrestadorByIdController.handle(req, res, next)
})

prestadorRoutes.get('/get-all', (req, res, next) => {
    getAllPrestadoresController.handle(req, res, next)
})