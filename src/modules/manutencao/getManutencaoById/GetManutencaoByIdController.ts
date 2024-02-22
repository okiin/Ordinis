import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetManutencaoByIdUseCase } from "./GetManutencaoByIdUseCase";

export class GetManutencaoByIdController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idManutencaoSchema = z.object({
            id: z.string()
        })

        const idManutencaoParam = idManutencaoSchema.safeParse(req.params)

        if (!idManutencaoParam.success) {
            return next(new AppError(`Informação id manutencao faltando.`))
        }

        const { id } = idManutencaoParam.data

        const getManutencao = new GetManutencaoByIdUseCase
        const manutencao = await getManutencao.execute(id)

        if (!manutencao) {
            return res.status(400).json({ success: true, data: manutencao })
        }

        return res.status(200).json({ success: true, data: manutencao })
    }
}