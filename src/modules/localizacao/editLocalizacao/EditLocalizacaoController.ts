import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetLocalizacaoByDescricaoUseCase } from "../getLocalizacaoByDescricao/GetLocalizacaoByDescricaoUseCase";
import { EditLocalizacaoUseCase } from "./EditLocalizacaoUseCase";
import { GetLocByIdUseCase } from "../getLocalizacaoById/GetLocByIdUseCase";

export class EditLocalizacaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const localizacaoSchema = z.object({
            descricao: z.string()
        })

        const idLocSchema = z.object({
            id: z.string()
        })

        const locBody = localizacaoSchema.safeParse(req.body)
        const idLocParam = idLocSchema.safeParse(req.params)

        if (!locBody.success) {
            return next(new AppError('Descricao da localização não encontrada.'))
        }

        if (!idLocParam.success) {
            return next(new AppError('Id da localização não encontrada.'))
        }

        const { id } = idLocParam.data
        let { descricao } = locBody.data

        descricao = descricao.trim()

        if (descricao === "" || descricao === " ") {
            return next(new AppError('Não é possível cadastrar localização vazia.'))
        }

        const localizacaoDescricao = await GetLocalizacaoByDescricaoUseCase.execute(descricao)

        if (localizacaoDescricao) {
            return next(new AppError('Localização já existente.'))
        }

        const getLocalizacaoById = new GetLocByIdUseCase
        const localizacaoId = await getLocalizacaoById.execute(id)

        if (!localizacaoId) {
            return next(new AppError('Localização não encontrada.'))
        }

        const editLocalizacaoUseCase = new EditLocalizacaoUseCase
        const localizacao = await editLocalizacaoUseCase.execute(id, descricao)

        if (!localizacao) {
            return res.status(400).json({ success: false, message: 'Erro ao editar localização.' })
        }

        return res.status(200).json({ success: true, data: localizacao })
    }
}