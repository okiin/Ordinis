import { Router } from "express"
import { AuthUsuarioController } from "../modules/sessao/loginUsuario/AuthUsuarioController"

export const sessaoRouter = Router()

const authUsuarioController = new AuthUsuarioController

sessaoRouter.post('/', (req, res, next) => {
    authUsuarioController.handle(req, res, next)
})