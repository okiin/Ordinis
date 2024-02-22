import { Patrimonio } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class EditLocalizacaoPatrUseCase {
    async execute(id: string, id_localizacao: string): Promise<Patrimonio | null> {
        try {
            const patrimonio = await prisma.patrimonio.update({
                where: {
                    id
                },
                data: {
                    id_localizacao
                }
            })

            return patrimonio
        } catch {
            return null
        }
    }
}