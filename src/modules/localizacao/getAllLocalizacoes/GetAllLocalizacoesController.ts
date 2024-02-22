import { NextFunction, Request, Response } from "express";
import { GetAllLocalizacoesUseCase } from "./GetAllLocalizacoesUseCase";
import { z } from "zod";
import { GetLocalizacaoByDescricaoUseCase } from "../getLocalizacaoByDescricao/GetLocalizacaoByDescricaoUseCase";

export class GetAllLocalizacoesController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const localizacaoQuery = z.object({
            descricao: z.string()
        })

        const query = localizacaoQuery.safeParse(req.query)

        const localizacoes = (!query.success)
            ? await GetAllLocalizacoesUseCase.execute()
            : await GetLocalizacaoByDescricaoUseCase.execute(query.data.descricao)

        if (!localizacoes) {
            return res.status(400).json({ success: false, data: localizacoes })
        }

        if (Array.isArray(localizacoes)) {

            if (!localizacoes[0]) {
                return res.status(400).json({ success: false, data: localizacoes })
            }
            
            return res.status(200).json({ success: true, data: localizacoes })
        }

        return res.status(200).json({ success: true, data: [localizacoes] })

    }
}