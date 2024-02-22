import { Router } from "express"
import { CreateUsuarioController } from "../modules/usuario/createUsuario/CreateUsuarioController"
import { GetUsuarioByIdController } from "../modules/usuario/getUsuarioById/GetUsuarioByIdController"
import { ensureAuthPermissao } from "../middlewares/ensureAuthPermissao"
import { DeleteUsuarioController } from "../modules/usuario/deleteUsuario/DeleteUsuarioController"
import { EditUsuarioController } from "../modules/usuario/editUsuario/EditUsuarioController"
import { GetMeController } from "../modules/usuario/getMe/GetMeController"
import { EditSenhaController } from "../modules/usuario/editSenha/EditSenhaController"
import { GetAllUsuariosController } from "../modules/usuario/getAllUsuarios/GetAllUsuariosController"

export const usuarioRouter = Router()

const createUsuarioController = new CreateUsuarioController
const getUsuarioByIdController = new GetUsuarioByIdController
const deleteUsuarioController = new DeleteUsuarioController
const editUsuarioController = new EditUsuarioController
const getMeController = new GetMeController
const editSenhaController = new EditSenhaController
const getAlUsuariosController = new GetAllUsuariosController

usuarioRouter.get('/get-me', (req, res, next) => {
    getMeController.handle(req, res, next)
})

usuarioRouter.get('/get/:id', (req, res, next) => {
    getUsuarioByIdController.handle(req, res, next)
})

usuarioRouter.post('/update/password', (req, res, next) => {
    editSenhaController.handle(req, res, next)
})

usuarioRouter.put('/update', (req, res, next) => {
    editUsuarioController.handle(req, res, next)
})

usuarioRouter.use(ensureAuthPermissao('ADMINISTRADOR'))

usuarioRouter.post('/create', (req, res, next) => {
    createUsuarioController.handle(req, res, next)
})

usuarioRouter.delete('/delete/:id', (req, res, next) => {
    deleteUsuarioController.handle(req, res, next)
})

usuarioRouter.get('/get-all', (req, res, next) => {
    getAlUsuariosController.handle(req, res, next)
})