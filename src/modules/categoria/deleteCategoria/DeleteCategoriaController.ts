import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { SearchPatrimonioUseCase } from "../../patrimonio/searchPatrimonio/SearchPatrimonioUseCase";
import { DeleteCategoriaUseCase } from "./DeleteCategoriaUseCase";

export class DeleteCategoriaController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idCategoriaSchema = z.object({
            id: z.string()
        })

        const idCategoriaParam = idCategoriaSchema.safeParse(req.params)

        if (!idCategoriaParam.success) {
            return next(new AppError('Id categoria faltando.'))
        }

        const { id } = idCategoriaParam.data

        const search = {
            id_categoria: {
                equals: id
            }
        }

        const searchPatrimonio = new SearchPatrimonioUseCase
        const patrimonio = await searchPatrimonio.execute(search)

        if (patrimonio === null) {
            return next(new AppError('Erro ao buscar patrimônios com essa categoria. Tente Novamente.'))
        }

        if (patrimonio[0]) {
            return next(new AppError('Não é possivel excluir uma categoria que está sendo utilizada.'))
        }

        const deleteCategoria = new DeleteCategoriaUseCase
        const categoria = await deleteCategoria.execute(id)

        if (!categoria) {
            return next(new AppError('Ocorreu um erro ao deletar categoria', 500))
        }

        return res.status(200).json({ success: true, data: categoria })
    }
}