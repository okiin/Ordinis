import { Categoria } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class DeleteCategoriaUseCase {
    async execute(id: string): Promise<Categoria | null> {
        try {
            const categoriaDeleted = await prisma.categoria.delete({
                where: {
                    id
                }
            })

            return categoriaDeleted
        } catch {
            return null
        }
    }
}