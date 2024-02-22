import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrimonioByPlacaUseCase } from "../getPatrimonioByPlaca/GetPatrimonioByPlacaUseCase";
import { GetPatrimonioByIdUseCase } from "../getPatrimonioById/GetPatrimonioByIdUseCase";
import { EditPatrimoniouseCase } from "./EditPatrimonioUseCase";

export class EditPatrimonioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const editPatrSchema = z.object({
            placa: z.string(),
            descricao: z.string(),
            estado: z.enum(['EXCELENTE', 'OTIMO', 'REGULAR', 'RUIM', 'PESSIMO']),
            valor: z.number(),
            origem: z.enum(['PREFEITURA', 'NV']),
            id_localizacao: z.string(),
            id_categoria: z.string()
        })

        const idPatrSchema = z.object({
            id: z.string()
        })

        const patrimonioBody = editPatrSchema.safeParse(req.body)
        const idPatrimonioBody = idPatrSchema.safeParse(req.params)

        if (!patrimonioBody.success) {
            return next(new AppError('Informações de edição incorretas.'))
        }

        if (!idPatrimonioBody.success) {
            return next(new AppError('Id patrimônio faltando!'))
        }

        let {
            placa,
            descricao,
            estado,
            valor,
            origem,
            id_localizacao,
            id_categoria
        } = patrimonioBody.data

        placa = placa.trim().toUpperCase()

        const { id } = idPatrimonioBody.data

        const getPatrimoniobyId = new GetPatrimonioByIdUseCase
        const patrimonioId = await getPatrimoniobyId.execute(id)

        if (!patrimonioId) {
            return next(new AppError('Id patrimonio não encontrado.'))
        }

        if (patrimonioId.status === 0) {
            return next(new AppError('Não é possível editar patrimônio baixado.'))
        }

        const getPatrimonioByPlaca = new GetPatrimonioByPlacaUseCase
        const patrimonioPlaca = await getPatrimonioByPlaca.execute(placa)

        if (patrimonioPlaca) {
            if (patrimonioPlaca.id !== id) {
                return next(new AppError('Placa já existente.'))
            }
        }

        const editPatrimonioUseCase = new EditPatrimoniouseCase
        const patrimonio = await editPatrimonioUseCase.execute(id, {
            placa: placa.trim(),
            descricao: descricao.trim(),
            estado,
            valor,
            origem,
            id_localizacao,
            id_categoria
        })

        if (!patrimonio) {
            return res.status(400).json({ success: false, message: 'Erro ao editar patrimônio.' })
        }

        return res.status(200).json({ success: true, data: patrimonio })
    }
}