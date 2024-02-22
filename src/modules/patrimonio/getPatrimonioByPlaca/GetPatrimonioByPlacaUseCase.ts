import { Patrimonio } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetPatrimonioByPlacaUseCase {
    async execute(placa: string): Promise<Patrimonio | null> {
        try {
            placa = placa.trim().toUpperCase()

            const patrimonio = await prisma.patrimonio.findUnique({
                where: {
                    placa
                }
            })

            return patrimonio
        } catch {
            return null
        }
    }
}