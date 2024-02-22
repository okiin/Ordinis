import { Categoria } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetCategoriaByDescricaoUseCase {
    static async execute(descricao: string): Promise<Categoria | null> {
        try {
            const categoria = await prisma.categoria.findUnique({
                where: {
                    descricao
                }
            })

            return categoria
        } catch {
            return null
        }
    }
}