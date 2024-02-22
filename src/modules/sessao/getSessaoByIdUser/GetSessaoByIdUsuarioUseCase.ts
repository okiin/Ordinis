import { Sessao } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetSessaoByIdUsuarioUseCase {
    async execute(id_usuario: string): Promise<Sessao | null> {
        try {
            const sessao = await prisma.sessao.findFirst({
                where: {
                    id_usuario
                }
            })

            return sessao
        } catch {
            return null
        }
    }
}