import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrimonioByIdUseCase } from "../getPatrimonioById/GetPatrimonioByIdUseCase";
import { CadastrarBaixaPatrUseCase } from "./CadastrarBaixaPatrUseCase";

export class CadastrarBaixaPatrController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const baixaPatrSchema = z.object({
            data_saida: z.coerce.date(),
            resp_entrega: z.string(),
            resp_retirada: z.string()
        })

        const idPatrSchema = z.object({
            id: z.string()
        })

        const baixaPatrBody = baixaPatrSchema.safeParse(req.body)
        const idPatrBody = idPatrSchema.safeParse(req.params)

        if (!baixaPatrBody.success) {
            return next(new AppError('Informações incorretas para baixa do património.'))
        }

        if (!idPatrBody.success) {
            return next(new AppError('Informação id_patrimonio incorreta.'))
        }

        const { resp_entrega, resp_retirada, data_saida } = baixaPatrBody.data
        const { id } = idPatrBody.data

        const getPatrimonioById = new GetPatrimonioByIdUseCase
        const patrimonioId = await getPatrimonioById.execute(id)

        if (!patrimonioId) {
            return next(new AppError('Patrimônio não encontrado. Tente novamente!'))
        }

        if (patrimonioId.data_saida) {
            return next(new AppError('Patrimônio já foi dado baixa!'))
        }

        if (data_saida < patrimonioId.data_entrada) {
            return next(new AppError('Data saída menor que data entrada do patrimônio!'))
        }

        const cadastrarBaixaPatr = new CadastrarBaixaPatrUseCase
        const patrimonio = await cadastrarBaixaPatr.execute({ id, data_saida, resp_entrega, resp_retirada })

        if (!patrimonio) {
            return res.status(400).json({ success: false, message: "Algo deu errado. Tente novamente!" })
        }

        return res.status(201).json({ success: true, data: patrimonio })
    }
}