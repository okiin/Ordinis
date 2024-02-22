import { hash } from "bcrypt";
import { prisma } from "../../../lib/prisma";

export class EditSenhaUseCase {
    async execute(id: string, nova_senha: string): Promise<boolean> {
        try {

            const hashNovaSenha = await hash(nova_senha, 4)
            await prisma.sessao.update({
                where: {
                    id
                },
                data: {
                    senha: hashNovaSenha
                }
            })

            return true
        } catch {
            return false
        }
    }
}