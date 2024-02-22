import { Localizacao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetAllLocalizacoesUseCase {
    static async execute(): Promise<Localizacao[] | null> {
        try {
            const localizacoes = await prisma.localizacao.findMany()

            return localizacoes
        } catch {
            return null
        }
    }
}