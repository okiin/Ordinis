import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { CreateCategoriaUseCase } from "./CreateCategoriaUseCase";
import { GetCategoriaByDescricaoUseCase } from "../getCategoriaByDescricao/GetCategoriaByDescricaoUseCase";

export class CreateCategoriaController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const categoriaSchema = z.object({
            descricao: z.string()
        })

        const categoriaBody = categoriaSchema.safeParse(req.body)

        if (!categoriaBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        let { descricao } = categoriaBody.data

        descricao = descricao.trim()

        if (descricao === "" || descricao === " ") {
            return next(new AppError('Não é possível cadastrar categoria vazia.'))
        }

        const categoriaDescricao = await GetCategoriaByDescricaoUseCase.execute(descricao)

        if (categoriaDescricao) {
            return next(new AppError('Categoria já existente.'))
        }

        const createCategoria = new CreateCategoriaUseCase
        const categoria = await createCategoria.execute(descricao)

        if (!categoria) {
            return res.status(400).json({ success: false })
        }

        return res.status(201).json({ success: true, data: categoria })
    }
}