import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { compare } from "bcrypt";
import { GetUsuarioByIdUseCase } from "../getUsuarioById/GetUsuarioByIdUseCase";
import { GetSessaoByIdUsuarioUseCase } from "../../sessao/getSessaoByIdUser/GetSessaoByIdUsuarioUseCase";
import { EditSenhaUseCase } from "./EditSenhaUseCase";

export class EditSenhaController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const editSenhaSchema = z.object({
            senha_atual: z.string().min(6),
            nova_senha: z.string().min(6),
            id_usuario: z.string()
        })

        const senhaBody = editSenhaSchema.safeParse(req.body)

        if (!senhaBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        const { senha_atual, nova_senha, id_usuario } = senhaBody.data

        const getSessaoByIdUsuario = new GetSessaoByIdUsuarioUseCase
        const sessao = await getSessaoByIdUsuario.execute(id_usuario)

        if (!sessao) {
            return next(new AppError('Erro! Usuário não encontrado.'))
        }

        const isPasswordCorrect = await compare(senha_atual, sessao.senha)

        if (!isPasswordCorrect) {
            return next(new AppError('Senha atual incorreta.'))
        }

        const editSenha = new EditSenhaUseCase
        const isSenhaEdited = await editSenha.execute(sessao.id, nova_senha)

        if (!isSenhaEdited) {
            return res.status(400).json({ success: false, message: 'Algo deu errado.' })
        }

        return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' })
    }
}