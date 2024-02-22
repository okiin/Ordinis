import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrimonioByIdUseCase } from "./GetPatrimonioByIdUseCase";

export class GetPatrimonioByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idPatrSchema = z.object({
            id: z.string()
        })

        const idPatrBody = idPatrSchema.safeParse(req.params)

        if (!idPatrBody.success) {
            return next(new AppError('Id do patrimônio faltando.'))
        }

        const { id } = idPatrBody.data

        const getPatrimonioById = new GetPatrimonioByIdUseCase
        const patrimonio = await getPatrimonioById.execute(id)

        if(!patrimonio){
            return res.status(400).json({success: false, data: patrimonio})
        }

        return res.status(200).json({success: true, data: patrimonio})
    }
}