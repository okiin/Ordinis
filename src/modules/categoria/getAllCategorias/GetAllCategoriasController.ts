import { NextFunction, Request, Response } from "express";
import { GetAllCategoriasUseCase } from "./GetAllCategoriasUseCase";
import { object, string, z } from "zod";
import { GetCategoriaByDescricaoUseCase } from "../getCategoriaByDescricao/GetCategoriaByDescricaoUseCase";

export class GetAllCategoriasController {
    async handle(req: Request, res: Response, next: NextFunction) {

        const categoriaQuery = z.object({
            descricao: z.string()
        })

        const query = categoriaQuery.safeParse(req.query)

        const categorias = (!query.success)
            ? await GetAllCategoriasUseCase.execute()
            : await GetCategoriaByDescricaoUseCase.execute(query.data.descricao)

        if (!categorias) {
            return res.status(400).json({ success: false, data: categorias })
        }

        if (Array.isArray(categorias)) {

            if (!categorias[0]) {
                return res.status(400).send({ success: false, data: categorias })
            }
            
            return res.status(200).json({ success: true, data: categorias })
        }
        
        return res.status(200).json({ success: true, data: [categorias] })

    }
}