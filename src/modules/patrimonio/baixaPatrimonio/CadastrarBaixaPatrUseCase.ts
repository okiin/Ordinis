import { Patrimonio } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { PatrimonioBaixaProps } from "../../../types/patrimonio-baixa";

export class CadastrarBaixaPatrUseCase {
    async execute(patrimonioBaixa: PatrimonioBaixaProps): Promise<Patrimonio | null> {
        try {
            const { id, data_saida, resp_entrega, resp_retirada } = patrimonioBaixa

            const patrimonio = await prisma.patrimonio.update({
                where: {
                    id
                },
                data: {
                    data_saida,
                    resp_entrega,
                    resp_retirada,
                    status: 0
                }
            })

            return patrimonio
        } catch {
            return null
        }
    }
}