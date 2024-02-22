import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { CreateManutencaoUseCase } from "./CreateManutencaoUseCase";
import { GetPatrimonioByIdUseCase } from "../../patrimonio/getPatrimonioById/GetPatrimonioByIdUseCase";
import { GetPrestadorByIdUseCase } from "../../prestador/getPrestadorById/GetPrestadorByIdUseCase";
import { GetManutencaoByIdPatrUseCase } from "../GetManutencaoByPatr/GetManutencaoByPatrUseCase";

export class CreateManutencaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const manutencaoSchema = z.object({
            descricao: z.string(),
            data_inicio: z.coerce.date(),
            data_fim: z.coerce.date(),
            valor: z.number(),
            id_usuario: z.string(),
            id_prestador: z.string()
        })

        const idPatrSchema = z.object({
            id_patrimonio: z.string()
        })

        const manutencaoBody = manutencaoSchema.safeParse(req.body)
        const idPatrParam = idPatrSchema.safeParse(req.params)

        if (!manutencaoBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        if (!idPatrParam.success) {
            return next(new AppError('Id Patrimônio faltando.'))
        }

        const { descricao, data_inicio, data_fim, valor, id_prestador, id_usuario } = manutencaoBody.data
        const { id_patrimonio } = idPatrParam.data

        if (data_fim < data_inicio) {
            return next(new AppError('Data de previsão final não pode ser menor que data início'))
        }

        const getPatrimonioById = new GetPatrimonioByIdUseCase
        const patrimonio = await getPatrimonioById.execute(id_patrimonio)

        if (!patrimonio) {
            return next(new AppError('Patrimônio não encontrado.'))
        }

        if (!patrimonio.status) {
            return next(new AppError('Impossível registrar manutenção! Patrimônio foi dado baixa.'))
        }

        const getManutencoesPatrUseCase = new GetManutencaoByIdPatrUseCase
        const manutencoesPatr = await getManutencoesPatrUseCase.execute(id_patrimonio)

        if (!manutencoesPatr) {
            return next(new AppError('Erro ao localizar ultimas manutenções do Patrimônio'))
        }

        if (manutencoesPatr[0]) {
            if (manutencoesPatr[manutencoesPatr.length - 1].status === 1) {
                return next(new AppError('Patrimônio contém uma manutenção em aberto.'))
            }
        }

        const getPrestadorById = new GetPrestadorByIdUseCase
        const prestador = await getPrestadorById.execute(id_prestador)

        if (!prestador) {
            return next(new AppError('Prestador de serviço não encontrado.'))
        }

        const createManutencao = new CreateManutencaoUseCase
        const manutencao = await createManutencao.execute({ descricao, data_inicio, data_fim, valor, id_patrimonio, id_prestador, id_usuario })

        if (!manutencao) {
            return res.status(400).json({ success: false, message: 'Algo deu errado. Tente novamente!' })
        }

        return res.status(201).json({ success: true, data: manutencao })
    }
}