import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class DeleteLocalizacaoUseCase {
    async execute(id: string): Promise<Localizacao | null> {
        try {
            const localizacaoDeleted = await prisma.localizacao.delete({
                where: {
                    id
                }
            })

            return localizacaoDeleted
        } catch {
            return null
        }
    }
}