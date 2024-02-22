import { Request, Response, NextFunction } from "express"
import { AppError } from "../../../errors/AppError"
import { z } from "zod"
import { GetSessaoByEmailUseCase } from "../getUsuarioByEmail/GetUsuarioByEmailUseCase"
import { GetUsuarioByCpfUseCase } from "../getUsuarioByCpf/GetUsuarioByCpfUseCase"
import { CreateUsuarioUseCase } from "./CreateUsuarioUseCase"

export class CreateUsuarioController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const usuarioSchema = z.object({
            nome: z.string(),
            sobrenome: z.string(),
            permissao: z.enum(['ADMINISTRADOR', 'FUNCIONARIO']),
            cpf: z.string().length(11),
            email: z.string().email(),
            senha: z.string().min(6)
        })

        const usuarioBody = usuarioSchema.safeParse(req.body)

        if (!usuarioBody.success) {
            return next(new AppError('Informações inválidas!'))
        }

        const { nome, sobrenome, permissao, cpf, email, senha } = usuarioBody.data

        const getSessaoByEmail = new GetSessaoByEmailUseCase
        const isEmailExists = await getSessaoByEmail.execute(email)

        if (isEmailExists) {
            return next(new AppError('Email já cadastrado!'))
        }

        const getUsuarioByCpf = new GetUsuarioByCpfUseCase
        const isCpfExists = await getUsuarioByCpf.execute(cpf)

        if (isCpfExists) {
            return next(new AppError('Cpf já cadastrado!'))
        }

        const createUsuarioUseCase = new CreateUsuarioUseCase
        const usuario = await createUsuarioUseCase.execute({ nome, sobrenome, permissao, cpf, email, senha })

        if (!usuario) {
            return next(new AppError('Algo deu errado, tente novamente!', 500))
        }

        return res.status(201).send({ success: true, data: usuario })
    }
}