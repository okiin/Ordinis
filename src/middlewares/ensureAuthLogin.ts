import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { env } from "../env";
import { verify } from "jsonwebtoken";

export const ensureAuthLogin = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError('Token necessário!', 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const key = env.JWT_SECRET

        const resToken = verify(token, key) as {id: string, permissao: string, id_usuario: string}

        req.body.id_sessao = resToken.id
        req.body.permissao_usuario = resToken.permissao
        req.body.id_usuario = resToken.id_usuario
        next()
    } catch {
        throw new AppError('Token inválido!', 401)
    }
}