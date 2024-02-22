import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrByIdEditedUseCase } from "./GetPatrimoniobyIdEditedUseCase";

export class GetPatrByIdEditedController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idPatrSchema = z.object({
            id: z.string()
        })

        const idPatrParam = idPatrSchema.safeParse(req.params)

        if (!idPatrParam.success) {
            return next(new AppError('Id patrimônio faltando.'))
        }

        const { id } = idPatrParam.data

        const getPatrimonio = new GetPatrByIdEditedUseCase
        const patrimonio = await getPatrimonio.execute(id)

        if (!patrimonio) {
            return res.status(400).json({ success: false })
        }

        return res.status(200).json({ success: true, data: patrimonio })
    }
}