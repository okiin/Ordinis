import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPrestadorByIdUseCase } from "../getPrestadorById/GetPrestadorByIdUseCase";
import { EditPrestadorUseCase } from "./EditPrestadorUseCase";

export class EditPrestadorController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const prestadorSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            descricao: z.string(),
            telefone: z.string(),
            rua: z.string(),
            numero: z.number(),
            bairro: z.string()
        })

        const idPrestadorSchema = z.object({
            id: z.string()
        })

        const prestadorBody = prestadorSchema.safeParse(req.body)
        const idPrestadorParam = idPrestadorSchema.safeParse(req.params)

        if (!prestadorBody.success) {
            return next(new AppError('Informações do prestador de serviço inválidas.'))
        }

        if (!idPrestadorParam.success) {
            return next(new AppError('Id do prestador faltando.'))
        }

        const {
            nome,
            sobrenome,
            descricao,
            telefone,
            rua,
            numero,
            bairro
        } = prestadorBody.data

        const { id } = idPrestadorParam.data

        const getPrestadorByIdUseCase = new GetPrestadorByIdUseCase
        const prestadorId = await getPrestadorByIdUseCase.execute(id)

        if (!prestadorId) {
            return next(new AppError('Erro ao encontrar prestador pelo Id.'))
        }

        const editPrestadorUseCase = new EditPrestadorUseCase
        const prestador = await editPrestadorUseCase.execute({ id, nome, sobrenome, descricao, telefone, rua, numero, bairro })

        if (!prestador) {
            return res.status(400).json({ success: false, message: 'Erro ao editar  prestador de serviço' })
        }

        return res.status(200).json({ success: true, data: prestador })
    }
}