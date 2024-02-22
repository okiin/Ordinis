import { NextFunction, Request, Response } from "express";
import { GetAllManutencoesUseCase } from "./GetAllManutencoesUseCase";
import { AppError } from "../../../errors/AppError";

export class GetAllManutencoesController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const manutencoes = await GetAllManutencoesUseCase.execute()

        if (!manutencoes) {
            return res.status(500).json({ success: false, message: 'Internal server error!' })
        }

        if (!manutencoes[0]) {
            return res.status(400).json({ success: false, data: manutencoes })
        }

        return res.status(200).json({ success: true, data: manutencoes })
    }
}