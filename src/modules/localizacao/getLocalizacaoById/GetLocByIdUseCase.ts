import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetLocByIdUseCase {
    async execute(id: string): Promise<Localizacao | null> {
        try {
            const localizacao = await prisma.localizacao.findUnique({
                where: {
                    id
                }
            })

            return localizacao
        } catch {
            return null
        }
    }
}