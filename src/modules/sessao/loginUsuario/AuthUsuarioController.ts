import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AuthUsuarioUseCase } from "./AuthUsuarioUseCase";
import { GetSessaoByEmailUseCase } from "../../usuario/getUsuarioByEmail/GetUsuarioByEmailUseCase";
import { GetUsuarioByIdUseCase } from "../../usuario/getUsuarioById/GetUsuarioByIdUseCase";

export class AuthUsuarioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const authSchema = z.object({
            email: z.string().email(),
            senha: z.string().min(6)
        })

        const authBody = authSchema.safeParse(req.body)

        if (!authBody.success) {
            return res.status(400).json({
                success: false,
                message: "Email ou senha incorretos."
            })
        }

        const { email, senha } = authBody.data

        const getSessaoByEmail = new GetSessaoByEmailUseCase
        const sessao = await getSessaoByEmail.execute(email)

        if (!sessao) {
            return res.status(400).json({
                success: false,
                message: "Email ou senha incorretos."
            })
        }

        if (sessao.status === 0) {
            return res.status(400).json({
                success: false,
                message: "Conta desativada."
            })
        }

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuario = await getUsuarioById.execute(sessao.id_usuario)

        if (!usuario) {
            return res.status(400).json({
                success: false,
                message: "Conta desativada."
            })
        }

        const authUsuarioUseCase = new AuthUsuarioUseCase
        const auth = await authUsuarioUseCase.execute({ id: sessao.id, senha, hashSenha: sessao.senha, permissao: usuario.permissao, id_usuario: usuario.id })

        if (!auth.success) {
            return res.status(400).json({
                success: false,
                message: "Email ou senha incorretos."
            })
        }

        return res.status(200).json({ success: true, token: auth.token })
    }
}