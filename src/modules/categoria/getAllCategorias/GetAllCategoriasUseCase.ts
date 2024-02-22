import { Categoria } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetAllCategoriasUseCase {
    static async execute(): Promise<Categoria[] | null> {
        try {
            const categorias = await prisma.categoria.findMany()

            return categorias
        } catch {
            return null
        }
    }
}