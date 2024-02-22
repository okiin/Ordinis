import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class CreateLocalizacaoUseCase {
    async execute(descricao: string): Promise<Localizacao | null> {
        try {
            const localizacao = await prisma.localizacao.create({
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