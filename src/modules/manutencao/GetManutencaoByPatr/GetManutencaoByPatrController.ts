import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetManutencaoByIdPatrUseCase } from "./GetManutencaoByPatrUseCase";
import { GetPatrimonioByPlacaUseCase } from "../../patrimonio/getPatrimonioByPlaca/GetPatrimonioByPlacaUseCase";

export class GetManutencaoByPatrController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const placaPatrSchema = z.object({
            placa: z.string()
        })

        const placaPatrParam = placaPatrSchema.safeParse(req.params)

        if (!placaPatrParam.success) {
            return next(new AppError('Informação id patrimonio faltando.'))
        }

        const { placa } = placaPatrParam.data

        const getPatrimonioByPlaca = new GetPatrimonioByPlacaUseCase
        const patrimonio = await getPatrimonioByPlaca.execute(placa)

        if (!patrimonio) {
            return next(new AppError('Patrimônio não encontrado.'))
        }

        const getManutencoesByIdPatr = new GetManutencaoByIdPatrUseCase
        const manutencoes = await getManutencoesByIdPatr.execute(patrimonio.id)

        if (!manutencoes) {
            return res.status(500).json({ success: false, message: 'Internal server error!' })
        }

        if (!manutencoes[0]) {
            return res.status(400).json({ success: false, data: manutencoes })
        }

        return res.status(200).json({ success: true, data: manutencoes })
    }
}