import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrByPlacaEditedUseCase } from "./GetPatrByPlacaEditedUseCase";

export class GetPatrimonioByPlacaController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const placaPatrSchema = z.object({
            placa: z.string()
        })

        const placaPatrBody = placaPatrSchema.safeParse(req.params)

        if (!placaPatrBody.success) {
            return next(new AppError('Placa do patrimônio faltando.'))
        }

        let { placa } = placaPatrBody.data

        placa = placa.trim().toUpperCase()

        const getPatrByPlaca = new GetPatrByPlacaEditedUseCase
        const patrimonio = await getPatrByPlaca.execute(placa)

        if (!patrimonio) {
            return res.status(400).json({ success: false, data: patrimonio })
        }

        return res.status(200).json({ success: true, data: patrimonio })
    }
}