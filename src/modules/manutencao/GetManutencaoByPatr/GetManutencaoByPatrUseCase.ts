import { Manutencao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ManutencaoGetProps } from "../../../types/manutencao-get";

export class GetManutencaoByIdPatrUseCase {
    async execute(id_patrimonio: string): Promise<ManutencaoGetProps[] | null> {
        try {
            const manutencoes = await prisma.manutencao.findMany({
                select: {
                    id: true,
                    descricao: true,
                    data_inicio: true,
                    data_fim: true,
                    valor: true,
                    status: true,
                    patrimonio: {
                        select: {
                            id: true,
                            placa: true
                        }
                    },
                    prestador: {
                        select: {
                            id: true,
                            nome: true,
                            sobrenome: true
                        }
                    },
                    id_usuario: true
                },
                where: {
                    id_patrimonio
                },
                orderBy: {
                    data_fim: 'desc'
                }
            })

            return manutencoes
        } catch {
            return null
        }
    }
}