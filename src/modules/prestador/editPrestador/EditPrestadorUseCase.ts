import { Prestador, Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class EditPrestadorUseCase {
    async execute(data: Prisma.PrestadorCreateInput): Promise<Prestador | null> {
        try {
            const { id, nome, sobrenome, descricao, telefone, rua, numero, bairro } = data

            const prestador = prisma.prestador.update({
                where: {
                    id
                },
                data: {
                    nome,
                    sobrenome,
                    descricao,
                    telefone,
                    rua,
                    numero,
                    bairro
                }
            })

            return prestador
        } catch {
            return null
        }
    }
}