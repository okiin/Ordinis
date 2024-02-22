import { Prestador } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export class GetAllPrestadoresUseCase {
    static async execute(): Promise<Prestador[] | null> {
        try {
            const prestadores = await prisma.prestador.findMany()
            
            return prestadores
        } catch {
            return null
        }
    }
}