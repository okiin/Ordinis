import { Manutencao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { ManutencaoGetProps } from "../../../types/manutencao-get";

export class GetManutencoesAtivasUseCase {
    static async execute(): Promise<ManutencaoGetProps[] | null> {
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
                    status: 1
                },
                orderBy: {
                    data_fim: 'asc'
                }
            })

            return manutencoes
        } catch {
            return null
        }
    }
}