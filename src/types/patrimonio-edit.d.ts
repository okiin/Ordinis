export interface EditPatrimonioProps {
    placa: string,
    descricao: string,
    estado: 'EXCELENTE' | 'OTIMO' | 'REGULAR' | 'RUIM' | 'PESSIMO',
    valor: number,
    origem: 'PREFEITURA' | 'NV',
    id_localizacao: string,
    id_categoria: string
}