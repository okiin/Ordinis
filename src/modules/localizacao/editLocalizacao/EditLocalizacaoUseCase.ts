import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class EditLocalizacaoUseCase {
    async execute(id: string, descricao: string): Promise<Localizacao | null> {
        try {
            const localizacao = await prisma.localizacao.update({
                where: {
                    id
                },
                data: {
                    descricao
                }
            })

            return localizacao
        } catch {
            return null
        }
    }
}