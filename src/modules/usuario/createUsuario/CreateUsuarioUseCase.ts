import { Prisma, Usuario } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { CreateUsuarioProps } from "../../../types/usuario-create";
import { hash } from "bcrypt";

export class CreateUsuarioUseCase {
    async execute(usuario: CreateUsuarioProps): Promise<Usuario | null> {
        try {
            const { nome, sobrenome, permissao, cpf, email, senha } = usuario

            const hashSenha = await hash(senha, 4)

            const createUsuario = await prisma.usuario.create({
                data: {
                    nome,
                    sobrenome,
                    permissao,
                    cpf,
                    Sessao: {
                        create: {
                            email,
                            senha: hashSenha
                        }
                    }
                }
            })

            return createUsuario
        } catch {
            return null
        }
    }
}