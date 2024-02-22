import { Patrimonio, Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class CreatePatrimonioUseCase {
    async execute(patrimonio: Prisma.PatrimonioUncheckedCreateInput): Promise<Patrimonio | null> {
        try {
            const patrimonioCreated = await prisma.patrimonio.create({
                data: {
                    ...patrimonio
                }
            })

            return patrimonioCreated
        } catch {
            return null
        }
    }
}