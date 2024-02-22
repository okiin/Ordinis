export interface CreateUsuarioProps {
    nome: string,
    sobrenome: string,
    permissao: 'ADMINISTRADOR' | 'FUNCIONARIO',
    cpf: string,
    email: string,
    senha: string
}