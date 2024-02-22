import { Usuario } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class DeleteUsuarioUseCase {
    async execute(id: string): Promise<Usuario | null> {
        try {
            const usuario = await prisma.usuario.update({
                where: {
                    id
                },
                data: {
                    status: 0
                }
            })

            return usuario
        } catch {
            return null
        }
    }
}