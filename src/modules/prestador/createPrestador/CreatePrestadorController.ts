import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { CreatePrestadorUseCase } from "./CreatePrestadorUseCase";

export class CreatePrestadorController {
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

        const prestadorBody = prestadorSchema.safeParse(req.body)

        if (!prestadorBody.success) {
            return next(new AppError('Informações inválidas'))
        }

        const { nome, sobrenome, descricao, telefone, rua, numero, bairro } = prestadorBody.data

        const createPrestador = new CreatePrestadorUseCase
        const prestador = await createPrestador.execute({ nome, sobrenome, descricao, telefone, rua, numero, bairro })

        if (!prestador) {
            return res.status(400).json({ success: false, message: 'Algo deu errado. Tente novamente!' })
        }

        return res.status(201).json({ success: true, data: prestador })
    }
}