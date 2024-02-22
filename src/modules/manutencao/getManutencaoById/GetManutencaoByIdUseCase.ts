import { Manutencao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ManutencaoGetProps } from "../../../types/manutencao-get";

export class GetManutencaoByIdUseCase {
    async execute(id: string): Promise<ManutencaoGetProps | null> {
        try {
            const manutencao = await prisma.manutencao.findUnique({
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
                    id
                }
            })

            return manutencao
        } catch {
            return null
        }
    }
}