import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../../../errors/AppError";
import { GetPatrimonioByPlacaUseCase } from "../getPatrimonioByPlaca/GetPatrimonioByPlacaUseCase";
import { CreatePatrimonioUseCase } from "./CreatePatrimonioUseCase";
import { GetUsuarioByIdUseCase } from "../../usuario/getUsuarioById/GetUsuarioByIdUseCase";
import { GetLocByIdUseCase } from "../../localizacao/getLocalizacaoById/GetLocByIdUseCase";
import { GetCategoriaByIdUseCase } from "../../categoria/getCategoriaById/GetCategoriaByIdUseCase";

export class CreatePatrimonioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const patrimonioSchema = z.object({
            placa: z.string(),
            descricao: z.string(),
            estado: z.enum(['EXCELENTE', 'OTIMO', 'REGULAR', 'RUIM', 'PESSIMO']),
            valor: z.number(),
            origem: z.enum(['PREFEITURA', 'NV']),
            data_entrada: z.coerce.date(),
            id_localizacao: z.string(),
            id_categoria: z.string(),
            id_usuario: z.string()
        })

        const patrimonioBody = patrimonioSchema.safeParse(req.body)

        if (!patrimonioBody.success) {
            return next(new AppError('Informações inválidas.'))
        }

        let {
            placa,
            descricao,
            estado,
            valor,
            origem,
            data_entrada,
            id_localizacao,
            id_categoria,
            id_usuario
        } = patrimonioBody.data

        placa = placa.trim().toUpperCase()

        if (placa.length < 5 || !/^[A-Z0-9.-]+$/.test(placa)) {
            return next(new AppError('Placa com menos de 5 caracteres ou caracteres inválidos.'))
        }

        const getPatrimonioByPlaca = new GetPatrimonioByPlacaUseCase
        const ispatrPlacaExists = await getPatrimonioByPlaca.execute(placa)

        if (ispatrPlacaExists) {
            return next(new AppError('Placa já cadastrada.'))
        }

        const getUsuarioById = new GetUsuarioByIdUseCase
        const usuario = await getUsuarioById.execute(id_usuario)

        if (!usuario) {
            return next(new AppError('Erro com o usuário conectado.'))
        }

        if (usuario.status === 0) {
            return next(new AppError('Usuario desativado.'))

        }

        const getlocalizacaoById = new GetLocByIdUseCase
        const localizacao = await getlocalizacaoById.execute(id_localizacao)

        if (!localizacao) {
            return next(new AppError('Localização inválida.'))
        }

        const getCategoriaById = new GetCategoriaByIdUseCase
        const categoria = await getCategoriaById.execute(id_categoria)

        if (!categoria) {
            return next(new AppError('Categoria Inválida.'))
        }

        const createPatrimonio = new CreatePatrimonioUseCase
        const patrimonio = await createPatrimonio.execute({
            placa,
            descricao: descricao.trim(),
            estado,
            valor,
            origem,
            data_entrada,
            id_localizacao,
            id_categoria,
            id_usuario
        })

        if (patrimonio) {
            return res.status(201).json({ success: true, data: patrimonio })
        }

        return res.status(400).json({ success: false })
    }
}