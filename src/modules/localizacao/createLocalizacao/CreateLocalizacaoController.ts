import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { CreateLocalizacaoUseCase } from "./CreateLocalizacaoUseCase";
import { GetLocalizacaoByDescricaoUseCase } from "../getLocalizacaoByDescricao/GetLocalizacaoByDescricaoUseCase";

export class CreateLocalizacaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const localizacaoSchema = z.object({
            descricao: z.string()
        })

        const localizacaoBody = localizacaoSchema.safeParse(req.body)

        if (!localizacaoBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        let { descricao } = localizacaoBody.data

        descricao = descricao.trim()

        if (descricao === "" || descricao === " ") {
            return next(new AppError('Não é possível cadastrar localização vazia.'))
        }

        const localizacaoDescricao = await GetLocalizacaoByDescricaoUseCase.execute(descricao)

        if (localizacaoDescricao) {
            return next(new AppError('Localização já existente.'))
        }

        const createLocalizacao = new CreateLocalizacaoUseCase
        const localizacao = await createLocalizacao.execute(descricao)

        if (!localizacao) {
            return res.status(400).json({ success: false })
        }

        return res.status(201).json({ success: true, data: localizacao })
    }
}