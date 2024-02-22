import { Categoria } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetCategoriaByIdUseCase {
    async execute(id: string): Promise<Categoria | null> {
        try {
            const categoria = await prisma.categoria.findUnique({
                where: {
                    id
                }
            })

            return categoria
        } catch {
            return null
        }
    }
}