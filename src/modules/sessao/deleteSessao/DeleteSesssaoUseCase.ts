import { prisma } from "../../../lib/prisma";

export class DeleteSessaoUseCase {
    async execute(id_usuario: string): Promise<boolean> {
        try {
            await prisma.sessao.updateMany({
                where: {
                    id_usuario
                },
                data: {
                    status: 0
                }
            })

            return true
        } catch (e) {
            return false
        }
    }
}