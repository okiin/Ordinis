import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetLocalizacaoByDescricaoUseCase {
    static async execute(descricao: string): Promise<Localizacao | null> {
        try {
            const localizacao = await prisma.localizacao.findUnique({
                where: {
                    descricao
                }
            })

            return localizacao
        } catch {
            return null
        }
    }
}