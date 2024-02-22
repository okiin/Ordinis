import { Usuario } from "@prisma/client";
import { UsuarioEditProps } from "../../../types/usuario-edit";
import { prisma } from "../../../lib/prisma";

export class EditUsuarioUseCase {
    async execute(usuario: UsuarioEditProps): Promise<Usuario | null> {
        try {
            const { nome, sobrenome, cpf, id_usuario } = usuario

            const usuarioEdited = await prisma.usuario.update({
                where: {
                    id: id_usuario
                },
                data: {
                    nome,
                    sobrenome,
                    cpf
                }
            })

            return usuarioEdited
        } catch {
            return null
        }
    }
}