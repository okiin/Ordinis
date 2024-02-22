import { Manutencao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class BaixaManutencaoUseCase {
    async execute(id: string, data_fim: Date): Promise<Manutencao | null> {
        try {
            const manutencao = await prisma.manutencao.update({
                where: {
                    id
                },
                data: {
                    data_fim,
                    status: 0
                }
            })

            return manutencao
        } catch {
            return null
        }
    }
}