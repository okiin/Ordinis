import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { DeleteManutencaoUseCase } from "./DeleteManutencaoUseCase";
import { GetManutencaoByIdUseCase } from "../getManutencaoById/GetManutencaoByIdUseCase";

export class DeleteManutencaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idManutencaoSchema = z.object({
            id: z.string()
        })

        const idManutencaoParam = idManutencaoSchema.safeParse(req.params)

        if (!idManutencaoParam.success) {
            return next(new AppError('Id manutenção não encontrado.'))
        }

        const { id } = idManutencaoParam.data

        const getManutencaoById = new GetManutencaoByIdUseCase
        const manutencaoId = await getManutencaoById.execute(id)

        if (!manutencaoId) {
            return next(new AppError('Manutenção não encontrada.'))
        }

        const deleteManutencao = new DeleteManutencaoUseCase
        const manutencao = await deleteManutencao.execute(id)

        if (!manutencao) {
            return next(new AppError('Erro ao excluir a manutenção, tente novamente!'))
        }

        return res.status(200).json({ success: true, data: manutencao })
    }
}