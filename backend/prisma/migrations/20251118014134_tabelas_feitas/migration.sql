-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
