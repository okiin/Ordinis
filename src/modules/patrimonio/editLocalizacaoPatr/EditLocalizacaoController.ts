import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetLocByIdUseCase } from "../../localizacao/getLocalizacaoById/GetLocByIdUseCase";
import { GetPatrimonioByIdUseCase } from "../getPatrimonioById/GetPatrimonioByIdUseCase";
import { EditLocalizacaoPatrUseCase } from "./EditLocalizacaoPatrUseCase";

export class EditLocalizacaoPatrController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idLocalizacaoSchema = z.object({
            id_localizacao: z.string()
        })

        const idPatrSchema = z.object({
            id: z.string()
        })

        const idLocBody = idLocalizacaoSchema.safeParse(req.body)
        const idPatrParam = idPatrSchema.safeParse(req.params)

        if (!idLocBody.success) {
            return next(new AppError('Localização faltando.'))
        }

        if (!idPatrParam.success) {
            return next(new AppError('Id Patrimonio faltando.'))
        }

        const { id_localizacao } = idLocBody.data
        const { id } = idPatrParam.data

        const getPatrimonioById = new GetPatrimonioByIdUseCase
        const patrimonioId = await getPatrimonioById.execute(id)

        if (!patrimonioId) {
            return next(new AppError('Patrimônio não encontrado.'))
        }

        if (patrimonioId.status === 0) {
            return next(new AppError('Não é possível editar a localização de um patrimônio baixado.'))
        }

        const getLocalizacaoById = new GetLocByIdUseCase
        const localizacaoId = await getLocalizacaoById.execute(id_localizacao)

        if (!localizacaoId) {
            return next(new AppError('Localização não encontrada.'))
        }

        const editLocalizacaoPatrUseCase = new EditLocalizacaoPatrUseCase
        const patrimonio = await editLocalizacaoPatrUseCase.execute(id, id_localizacao)

        if (!patrimonio) {
            return res.status(400).json({ success: false, message: 'Erro ao editar localização do patrimônio.' })
        }

        return res.status(200).json({ success: true, data: patrimonio })
    }
}