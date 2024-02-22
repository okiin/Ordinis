import { Patrimonio } from "@prisma/client";
import { EditPatrimonioProps } from "../../../types/patrimonio-edit";
import { prisma } from "../../../lib/prisma";

export class EditPatrimoniouseCase {
    async execute(id: string, patrimonio: EditPatrimonioProps): Promise<Patrimonio | null> {
        try {
            const patrimonioEdited = await prisma.patrimonio.update({
                where: {
                    id
                },
                data: {
                    ...patrimonio
                }
            })

            return patrimonioEdited
        } catch {
            return null
        }
    }
}