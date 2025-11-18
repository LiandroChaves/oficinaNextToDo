import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UsuarioComTarefas } from "@/lib/types";

// Essa função roda no servidor
async function getDados() {
  // Busca usuários e tarefas ordenados por ID
  const usuarios = await prisma.usuario.findMany({
    include: {
      tarefas: true,
    },
    orderBy: {
      id: 'desc'
    }
  });
  return usuarios;
}

export default async function Home() {
  const usuarios = await getDados();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Oficina Next ToDo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.length === 0 ? (
          <p className="text-muted-foreground col-span-3 text-center">
            Nenhum usuário encontrado. Cadastre via Prisma Studio ou API.
          </p>
        ) : (
          usuarios.map((usuario: UsuarioComTarefas) => (
            <Card key={usuario.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{usuario.nome}</CardTitle>
                  <Badge variant="outline">ID: {usuario.id}</Badge>
                </div>
                <CardDescription>{usuario.email}</CardDescription>
              </CardHeader>

              <Separator />

              <CardContent className="pt-4">
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  Tarefas ({usuario.tarefas.length})
                </h4>
                <ul className="space-y-2">
                  {usuario.tarefas.length > 0 ? (
                    usuario.tarefas.map((tarefa) => (
                      <li
                        key={tarefa.id}
                        className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm flex items-center gap-2"
                      >
                        <div className={`w-2 h-2 rounded-full ${tarefa.concluida ? 'bg-green-500' : 'bg-orange-500'}`} />
                        {tarefa.titulo}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">Sem tarefas...</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}