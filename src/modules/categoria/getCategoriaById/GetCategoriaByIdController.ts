import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetCategoriaByIdUseCase } from "./GetCategoriaByIdUseCase";

export class GetCategoriaByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idSchema = z.object({
            id: z.string()
        })

        const idBody = idSchema.safeParse(req.params)

        if (!idBody.success) {
            return next(new AppError('Id categoria faltando!'))
        }

        const { id } = idBody.data

        const getCategoriaById = new GetCategoriaByIdUseCase
        const categoria = await getCategoriaById.execute(id)

        if (!categoria) {
            return res.status(400).json({ success: false, data: categoria })
        }

        return res.status(200).json({ success: true, data: categoria })
    }
}