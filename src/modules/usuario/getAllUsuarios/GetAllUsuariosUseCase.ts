import { prisma } from "../../../lib/prisma"
import { UsuarioGetAllProps } from "../../../types/usuario-get-all"

export class GetAllUsuariosUseCase {
    static async execute(): Promise<UsuarioGetAllProps[] | null> {
        try {
            const usuarios = await prisma.usuario.findMany({
                select: {
                    id: true,
                    nome: true,
                    sobrenome: true,
                    permissao: true,
                    cpf: true,
                    Sessao: {
                        select: {
                            email: true
                        }
                    },
                    status: true
                },
                where: {
                    status: 1
                }
            })

            const usuariosObj = usuarios.map((user) => {
                return {
                    ...user,
                    email: user.Sessao[0].email,
                    Sessao: undefined,
                }
            })

            return usuariosObj
        } catch {
            return null
        }
    }
}