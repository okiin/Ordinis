export interface PatrimonioNamesProps {
  id: string
  placa: string
  descricao: string
  estado: 'EXCELENTE' | 'OTIMO' | 'REGULAR' | 'RUIM' | 'PESSIMO'
  valor: number
  origem: 'PREFEITURA' | 'NV'
  status: number
  data_entrada: Date
  data_saida: Date | null
  resp_entrega: string | null
  resp_retirada: string | null
  localizacao: { id: string, descricao: string }
  categoria: { id: string, descricao: string }
  usuario: { id: string, nome: string, sobrenome: string }
}