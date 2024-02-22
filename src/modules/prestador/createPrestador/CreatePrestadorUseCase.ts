import { Prestador, Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class CreatePrestadorUseCase {
    async execute(prestadorProps: Prisma.PrestadorCreateInput): Promise<Prestador | null> {
        try {
            const { nome, sobrenome, descricao, telefone, rua, numero, bairro } = prestadorProps

            const prestador = await prisma.prestador.create({
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