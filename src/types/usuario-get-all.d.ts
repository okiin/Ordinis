export interface UsuarioGetAllProps {
    id: string
    nome: string
    sobrenome: string
    permissao: 'ADMINISTRADOR' | 'FUNCIONARIO'
    cpf: string
    status: number
    email: string
}