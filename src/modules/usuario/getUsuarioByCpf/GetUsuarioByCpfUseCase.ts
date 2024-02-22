import { Usuario } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetUsuarioByCpfUseCase {
    async execute(cpf: string): Promise<Usuario | null> {
        try {
            const usuarioByCpf = await prisma.usuario.findUnique({
                where: {
                    cpf
                }
            })

            return usuarioByCpf
        } catch {
            return null
        }
    }
}