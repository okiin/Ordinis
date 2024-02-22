import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetManutencaoByIdUseCase } from "../getManutencaoById/GetManutencaoByIdUseCase";
import { BaixaManutencaoUseCase } from "./BaixaManutencaoUseCase";

export class BaixaManutencaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const dataFimSchema = z.object({
            data_fim: z.coerce.date()
        })

        const idManuSchema = z.object({
            id: z.string()
        })

        const dataFimBody = dataFimSchema.safeParse(req.body)
        const idManuParam = idManuSchema.safeParse(req.params)

        if (!dataFimBody.success) {
            return next(new AppError('data fim faltando ou incorreta!'))
        }

        if (!idManuParam.success) {
            return next(new AppError('id da manutenção faltando!'))
        }

        const { data_fim } = dataFimBody.data
        const { id } = idManuParam.data

        const getManutencaoById = new GetManutencaoByIdUseCase
        const manutencaoId = await getManutencaoById.execute(id)

        if (!manutencaoId) {
            return next(new AppError('Erro ao encontrar a manutenção passada.'))
        }

        if (manutencaoId.status === 0) {
            return next(new AppError('Manutenção já foi finalizada!'))
        }

        if (data_fim < manutencaoId.data_inicio) {
            return next(new AppError('Data fim da manutenção menor que data início!'))
        }

        const baixaManutencao = new BaixaManutencaoUseCase
        const manutencao = await baixaManutencao.execute(id, data_fim)

        if (!manutencao) {
            return res.status(400).json({ success: false, message: 'Erro ao dar baixa na manutenção.' })
        }

        return res.status(200).json({ success: true, data: manutencao })
    }
}