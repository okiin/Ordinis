import { Prestador } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetPrestadorByIdUseCase {
    async execute(id: string): Promise<Prestador | null> {
        try {
            const prestador = await prisma.prestador.findUnique({
                where: {
                    id
                }
            })

            return prestador
        } catch {
            return null
        }
    }
}