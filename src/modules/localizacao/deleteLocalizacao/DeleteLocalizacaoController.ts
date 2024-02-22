import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { SearchPatrimonioUseCase } from "../../patrimonio/searchPatrimonio/SearchPatrimonioUseCase";
import { DeleteLocalizacaoUseCase } from "./DeleteLocalizacaoUseCase";

export class DeleteLocalizacaoController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const idLocalizacaoSchema = z.object({
            id: z.string()
        })

        const idLocParam = idLocalizacaoSchema.safeParse(req.params)

        if (!idLocParam.success) {
            return next(new AppError('Id localização não encontrado.'))
        }

        const { id } = idLocParam.data

        const search = {
            id_localizacao: {
                equals: id
            }
        }

        const searchPatrimonio = new SearchPatrimonioUseCase
        const patrimonio = await searchPatrimonio.execute(search)

        if (patrimonio === null) {
            return next(new AppError('Erro ao buscar patrimônios com essa localização. Tente Novamente.'))
        }

        if (patrimonio[0]) {
            return next(new AppError('Não é possível excluir uma localização que já está sendo utilizada.'))
        }

        const deleteLocalizacao = new DeleteLocalizacaoUseCase
        const localizacao = await deleteLocalizacao.execute(id)

        if (!localizacao) {
            return next(new AppError('Ocorreu um erro ao excluir a localização.', 500))
        }

        return res.status(200).json({ success: true, data: localizacao })
    }
}