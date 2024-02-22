import { prisma } from "../../../lib/prisma";
import { PatrimonioNamesProps } from "../../../types/patrimonio-names";

export class GetPatrimoniosRuinsUseCase {
    static async execute(): Promise<PatrimonioNamesProps[] | null> {
        try {
            const patrimonios = await prisma.patrimonio.findMany({
                where: {
                    AND: [
                        {
                            estado: {
                                in: ['RUIM', 'PESSIMO']
                            },
                        },
                        {
                            status: 1
                        }
                    ]
                },
                select: {
                    id: true,
                    placa: true,
                    descricao: true,
                    estado: true,
                    valor: true,
                    origem: true,
                    status: true,
                    data_entrada: true,
                    data_saida: true,
                    resp_entrega: true,
                    resp_retirada: true,
                    categoria: {
                        select: {
                            id: true,
                            descricao: true
                        }
                    },
                    localizacao: {
                        select: {
                            id: true,
                            descricao: true
                        }
                    },
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            sobrenome: true
                        }
                    }
                },
                orderBy: {
                    estado: 'desc'
                }
            })

            return patrimonios
        } catch {
            return null
        }
    }
}