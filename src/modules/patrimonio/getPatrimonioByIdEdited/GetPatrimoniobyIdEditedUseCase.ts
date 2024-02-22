import { Patrimonio } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { PatrimonioNamesProps } from "../../../types/patrimonio-names";

export class GetPatrByIdEditedUseCase {
    async execute(id: string): Promise<PatrimonioNamesProps | null> {
        try {
            const patrimonio = await prisma.patrimonio.findUnique({
                where: {
                    id
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
                }
            })

            if (!patrimonio) {
                return null
            }

            return patrimonio
        } catch {
            return null
        }
    }
}