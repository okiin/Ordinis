import { Categoria } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class CreateCategoriaUseCase {
    async execute(descricao: string): Promise<Categoria | null> {
        try {
            const categoria = await prisma.categoria.create({
                data: {
                    descricao
                }
            })

            return categoria
        } catch {
            return null
        }
    }
}