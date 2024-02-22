import { NextFunction, Request, Response } from "express";
import { GetAllUsuariosUseCase } from "./GetAllUsuariosUseCase";

export class GetAllUsuariosController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const usuarios = await GetAllUsuariosUseCase.execute()

        if (!usuarios) {
            return res.status(500).json({ success: false, message: 'Internal server error!' })
        }

        if (!usuarios[0]) {
            return res.status(400).json({ success: false, data: usuarios })
        }

        return res.status(200).json({ success: true, data: usuarios })
    }
}