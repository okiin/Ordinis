import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetUsuarioByIdUseCase } from "./GetUsuarioByIdUseCase";

export class GetUsuarioByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idSchema = z.object({
            id: z.string()
        })

        const idBody = idSchema.safeParse(req.params)

        if (!idBody.success) {
            return next(new AppError('Id não encontrado.'))
        }

        const { id } = idBody.data

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuario = await getUsuarioById.execute(id)

        if (!usuario) {
            return res.status(400).send({ success: false, data: usuario })
        }
        return res.status(200).send({ success: true, data: usuario })
    }
}