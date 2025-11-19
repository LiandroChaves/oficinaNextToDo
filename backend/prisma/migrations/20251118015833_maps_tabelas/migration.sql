/*
  Warnings:

  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_id_user_fkey";

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
