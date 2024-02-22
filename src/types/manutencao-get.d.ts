export interface ManutencaoGetProps {
    id: string
    descricao: string
    data_inicio: Date
    data_fim: Date | null
    valor: number
    status: number
    patrimonio: { id: string, placa: string}
    prestador: { id: string, nome: string, sobrenome: string }
    id_usuario: string
}