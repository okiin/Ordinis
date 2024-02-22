import { Manutencao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class DeleteManutencaoUseCase {
    async execute(id: string): Promise<Manutencao | null> {
        try {
            const manutencao = await prisma.manutencao.delete({
                where: {
                    id
                }
            })

            return manutencao
        } catch {
            return null
        }
    }
}