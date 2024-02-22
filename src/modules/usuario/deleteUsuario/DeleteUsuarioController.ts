import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetUsuarioByIdUseCase } from "../getUsuarioById/GetUsuarioByIdUseCase";
import { DeleteUsuarioUseCase } from "./DeleteUsuarioUseCase";
import { DeleteSessaoUseCase } from "../../sessao/deleteSessao/DeleteSesssaoUseCase";

export class DeleteUsuarioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idSchema = z.object({
            id: z.string()
        })

        const idUserSchema = z.object({
            id_usuario: z.string()
        })

        const idToDelete = idSchema.safeParse(req.params)
        const idUsuarioBody = idUserSchema.safeParse(req.body)

        if (!idToDelete.success) {
            return next(new AppError('Parâmetro id não encontrado.'))
        }

        if (!idUsuarioBody.success) {
            return next(new AppError('Id do usuário conectado não encontrado.'))
        }

        const { id } = idToDelete.data
        const { id_usuario } = idUsuarioBody.data

        if (id === id_usuario) {
            return next(new AppError('Não é possível excluir o usuario da sessão conectada.'))
        }

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuario = await getUsuarioById.execute(id)

        if (!usuario) {
            return next(new AppError('Usuário não encontrado.'))
        }

        if (usuario.status === 0) {
            return next(new AppError('Usuário já desativado.'))
        }

        const deleteUsuarioUseCase = new DeleteUsuarioUseCase
        const usuarioDeleted = await deleteUsuarioUseCase.execute(id)

        if (!usuarioDeleted) {
            return next(new AppError('Algo deu errado ao desativar usuário.'))
        }

        const deleteSessaoUseCase = new DeleteSessaoUseCase
        const sessaoDeleted = await deleteSessaoUseCase.execute(id)

        if (!sessaoDeleted) {
            return next(new AppError('Algo deu errado ao desativar a sessão do usuário.'))
        }

        return res.status(200).json({ success: true, data: usuarioDeleted })
    }
}