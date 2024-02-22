import { Usuario } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { AppError } from "../../../errors/AppError";

export class GetUsuarioByIdUseCase {
    async execute(id: string): Promise<Usuario | null> {
        try {
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id
                },
                include: {
                    Sessao: {
                        select: {
                            email: true
                        }
                    }
                }
            })

            if (!usuario) {
                return null
            }

            const usuarioModified = {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                permissao: usuario.permissao,
                cpf: usuario.cpf,
                status: usuario.status,
                email: usuario.Sessao[0].email
            }

            return usuarioModified
        } catch {
            return null
        }
    }
}