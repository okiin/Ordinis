import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPrestadorByIdUseCase } from "./GetPrestadorByIdUseCase";

export class GetPrestadorByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idPrestadorSchema = z.object({
            id: z.string()
        })

        const idPrestadorBody = idPrestadorSchema.safeParse(req.params)

        if (!idPrestadorBody.success) {
            return next(new AppError('Informação id prestador faltando.'))
        }

        const { id } = idPrestadorBody.data

        const getPrestador = new GetPrestadorByIdUseCase
        const prestador = await getPrestador.execute(id)

        if (!prestador) {
            return res.status(400).json({ success: false, data: prestador })
        }

        return res.status(200).json({success: true, data: prestador})
    }
}