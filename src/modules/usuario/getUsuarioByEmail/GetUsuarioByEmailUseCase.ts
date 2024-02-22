import { Sessao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetSessaoByEmailUseCase {
    async execute(email: string): Promise<Sessao | null> {
        try {
            const sessao = await prisma.sessao.findUnique({
                where: {
                    email
                }
            })

            return sessao
        } catch {
            return null
        }
    }
}