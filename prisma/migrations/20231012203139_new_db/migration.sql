-- CreateEnum
CREATE TYPE "Permissao" AS ENUM ('ADMINISTRADOR', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "Estado_Patrimonio" AS ENUM ('EXCELENTE', 'OTIMO', 'REGULAR', 'RUIM', 'PESSIMO');

-- CreateEnum
CREATE TYPE "Origem_Patrimonio" AS ENUM ('PREFEITURA', 'NV');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "permissao" "Permissao" NOT NULL,
    "cpf" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patrimonio" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estado" "Estado_Patrimonio" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "origem" "Origem_Patrimonio" NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "data_entrada" TIMESTAMP(3) NOT NULL,
    "data_saida" TIMESTAMP(3),
    "resp_entrega" TEXT,
    "resp_retirada" TEXT,
    "id_localizacao" TEXT NOT NULL,
    "id_categoria" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Patrimonio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localizacao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Localizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manutencao" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3),
    "valor" DOUBLE PRECISION NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "id_patrimonio" TEXT NOT NULL,
    "id_prestador" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Sessao_email_key" ON "Sessao"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patrimonio_placa_key" ON "Patrimonio"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Localizacao_descricao_key" ON "Localizacao"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_descricao_key" ON "Categoria"("descricao");

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrimonio" ADD CONSTRAINT "Patrimonio_id_localizacao_fkey" FOREIGN KEY ("id_localizacao") REFERENCES "Localizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrimonio" ADD CONSTRAINT "Patrimonio_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrimonio" ADD CONSTRAINT "Patrimonio_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_id_patrimonio_fkey" FOREIGN KEY ("id_patrimonio") REFERENCES "Patrimonio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_id_prestador_fkey" FOREIGN KEY ("id_prestador") REFERENCES "Prestador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manutencao" ADD CONSTRAINT "Manutencao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
