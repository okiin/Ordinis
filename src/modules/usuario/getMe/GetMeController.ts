import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetUsuarioByIdUseCase } from "../getUsuarioById/GetUsuarioByIdUseCase";

export class GetMeController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idSchema = z.object({
            id_usuario: z.string()
        })

        const idBody = idSchema.safeParse(req.body)

        if (!idBody.success) {
            return next(new AppError('Id não encontrado.'))
        }

        const { id_usuario } = idBody.data

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuario = await getUsuarioById.execute(id_usuario)

        if (!usuario) {
            return res.status(400).json({ success: false, message: 'Usuário não encontrado.' })
        }

        return res.status(200).json({ success: true, data: usuario })
    }
}