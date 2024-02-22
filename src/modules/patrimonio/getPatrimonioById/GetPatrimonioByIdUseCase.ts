import { Patrimonio } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetPatrimonioByIdUseCase {
    async execute(id: string): Promise<Patrimonio | null> {
        try {
            const patrimonio = await prisma.patrimonio.findUnique({
                where: {
                    id
                }
            })

            return patrimonio
        } catch {
            return null
        }
    }
}