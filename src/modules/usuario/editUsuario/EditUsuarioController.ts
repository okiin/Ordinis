import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetUsuarioByIdUseCase } from "../getUsuarioById/GetUsuarioByIdUseCase";
import { EditUsuarioUseCase } from "./EditUsuarioUseCase";
import { GetUsuarioByCpfUseCase } from "../getUsuarioByCpf/GetUsuarioByCpfUseCase";

export class EditUsuarioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const editUsuarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            cpf: z.string().length(11),
            id_usuario: z.string()
        })

        const usuarioBody = editUsuarioSchema.safeParse(req.body)

        if (!usuarioBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        const { nome, sobrenome, cpf, id_usuario } = usuarioBody.data

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuarioById = await getUsuarioById.execute(id_usuario)


        if (usuarioById?.status === 0) {
            return next(new AppError('Usuário desativado.'))
        }

        const getUsuarioByCpf = new GetUsuarioByCpfUseCase
        const usuarioCpf = await getUsuarioByCpf.execute(cpf)

        if(usuarioCpf){
            if(usuarioCpf.id !== id_usuario) {
                return next(new AppError('Cpf já cadastrado.'))
            }
        }

        const editUsuario = new EditUsuarioUseCase
        const usuario = await editUsuario.execute({ nome, sobrenome, cpf, id_usuario })

        if (!usuario) {
            return res.status(400).json({ success: false, message: 'Algo deu errado ao editar usuário' })
        }

        return res.status(200).json({ success: true, data: usuario })
    }
}