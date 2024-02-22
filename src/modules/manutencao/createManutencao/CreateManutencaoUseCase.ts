import { Manutencao, Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class CreateManutencaoUseCase {
    async execute(manutencaoProps: Prisma.ManutencaoUncheckedCreateInput): Promise<Manutencao | null> {
        try {
            const { descricao, data_inicio, data_fim, valor, id_patrimonio, id_prestador, id_usuario } = manutencaoProps

            const manutencao = await prisma.manutencao.create({
                data: {
                    descricao,
                    data_inicio,
                    data_fim,
                    valor,
                    id_patrimonio,
                    id_prestador,
                    id_usuario
                }
            })

            return manutencao
        } catch {
            return null
        }
    }
}