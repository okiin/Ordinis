import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetLocByIdUseCase } from "./GetLocByIdUseCase";

export class GetLocByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idLocSchema = z.object({
            id: z.string()
        })

        const idLocBody = idLocSchema.safeParse(req.params)

        if (!idLocBody.success) {
            return next(new AppError('Id localizacao faltando!'))
        }

        const { id } = idLocBody.data

        const getLocById = new GetLocByIdUseCase
        const localizacao = await getLocById.execute(id)

        if (!localizacao) {
            return res.status(400).json({ success: false, data: localizacao })
        }

        return res.status(200).json({ success: true, data: localizacao })
    }
}