import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export const ensureAuthPermissao = (permissaoRequired: string) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const { permissao_usuario } = req.body
        
        if (permissao_usuario !== permissaoRequired) {
            throw new AppError('Permissão negada para realizar ação exigida!', 401)
        }

        next()
    }
}