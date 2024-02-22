import { compare } from "bcrypt";
import { UsuarioLoginProps } from "../../../types/usuario-login";
import { env } from "../../../env";
import { sign } from "jsonwebtoken";

export class AuthUsuarioUseCase {
    async execute(usuario: UsuarioLoginProps) {
        try {
            const { id, senha, hashSenha, permissao, id_usuario } = usuario

            const isPasswordCorrect = await compare(senha, hashSenha)

            if(!isPasswordCorrect) {
                return ({
                    success: false
                })
            }

            const key = env.JWT_SECRET

            const token = sign({id, permissao, id_usuario}, key, {expiresIn: '2d'})

            return ({
                success: true,
                token
            })
        } catch {
            return ({
                success: false
            })
        }
    }
}