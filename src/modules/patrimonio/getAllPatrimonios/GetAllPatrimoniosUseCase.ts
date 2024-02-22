import { prisma } from "../../../lib/prisma";
import { PatrimonioNamesProps } from "../../../types/patrimonio-names";

export class GetAllPatrimoniosUseCase {
    static async execute(): Promise<PatrimonioNamesProps[] | null> {
        try {
            // const patrimonios: Patrimonio[]  = await prisma.$queryRaw`
            // SELECT p.id, p.placa, p.descricao, p.estado, p.valor, p.origem, p.status, p.data_entrada, p.data_saida, p.resp_entrega, p.resp_retirada, l.descricao id_localizacao, c.descricao id_categoria, p.id_usuario
            // FROM patrimonio p
            // INNER JOIN localizacao l ON p.id_localizacao = l.id
            // INNER JOIN categoria c ON p.id_categoria = c.id
            // `

            // return patrimonios

            const patrimonios = await prisma.patrimonio.findMany({
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
                    data_entrada: 'desc'
                }
            })

            return patrimonios
        } catch {
            return null
        }
    }
}