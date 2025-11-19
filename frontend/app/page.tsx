"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/services/api";
import { UsuarioComTarefas } from "../lib/types";

// Componentes UI (Mantenha seus imports normais)
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Pencil, Plus, UserPlus } from "lucide-react";

export default function Home() {
  const [usuariosCompletos, setUsuariosCompletos] = useState<UsuarioComTarefas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- CARREGAMENTO ---
  async function carregarDados() {
    try {
      const [usuariosData, tarefasData] = await Promise.all([
        api.getUsuarios(),
        api.getTodasTarefas(),
      ]);

      const dadosUnificados: UsuarioComTarefas[] = usuariosData.map((user) => {
        // CORRIGIDO: Agora usamos t.idUsuario para bater com a API
        const minhasTarefas = tarefasData.filter((t) => t.idUsuario === user.id);
        return { ...user, tarefas: minhasTarefas };
      });

      setUsuariosCompletos(dadosUnificados);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // --- AÇÕES USUÁRIO ---

  async function handleCriarUsuario() {
    if (!novoNome || !novoEmail) return alert("Preencha tudo!");
    await api.createUsuario({ nome: novoNome, email: novoEmail });
    setNovoNome(""); setNovoEmail(""); setIsModalOpen(false);
    carregarDados();
  }

  async function handleDeletarUsuario(id: number) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await api.deleteUsuario(id);
        carregarDados();
      } catch (error: any) {
        // Mostra o erro do backend (ex: "Não é possível excluir: usuário possui tarefas")
        alert(error.message);
      }
    }
  }

  async function handleEditarUsuario(user: UsuarioComTarefas) {
    const novoNome = prompt("Novo nome:", user.nome);
    if (novoNome === null) return;
    const novoEmail = prompt("Novo email:", user.email);

    if (novoNome && novoEmail) {
      await api.updateUsuario(user.id, { nome: novoNome, email: novoEmail });
      carregarDados();
    }
  }

  // --- AÇÕES TAREFA ---

  async function handleCriarTarefa(idUsuario: number) {
    const titulo = prompt("Qual o título da tarefa?");
    if (titulo) {
      await api.createTarefa({ titulo, idUsuario });
      carregarDados();
    }
  }

  async function handleDeletarTarefa(id: number, tarefa: string) {
    if (confirm(`Excluir a tarefa: ${tarefa}?`)) {
      await api.deleteTarefa(id);
      carregarDados();
    }
  }

  async function handleEditarTarefa(id: number, tituloAtual: string) {
    const novoTitulo = prompt("Editar tarefa:", tituloAtual);
    if (novoTitulo) {
      await api.updateTarefa(id, novoTitulo);
      carregarDados();
    }
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center animate-pulse">Carregando...</div>;
  }

  return (
    <main className="container mx-auto py-10 space-y-8">
      {/* ... (Mantenha o JSX visual idêntico ao seu anterior, está ótimo) ... */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Oficina Next ToDo</h1>
          <p className="text-muted-foreground">Gerenciamento completo</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button><UserPlus className="mr-2 h-4 w-4" /> Novo Usuário</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Usuário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Ex: João Silva" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={novoEmail} onChange={e => setNovoEmail(e.target.value)} placeholder="joao@email.com" />
              </div>
              <Button onClick={handleCriarUsuario} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuariosCompletos.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">Nenhum usuário cadastrado.</p>
        ) : usuariosCompletos.map((user) => (
          <Card key={user.id} className="relative group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2 cursor-pointer hover:text-blue-600" onClick={() => handleEditarUsuario(user)}>
                    {user.nome} <Pencil className="h-3 w-3 opacity-50" />
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline">ID: {user.id}</Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => handleDeletarUsuario(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-muted-foreground">Tarefas ({user.tarefas.length})</h4>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleCriarTarefa(user.id)}>
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>

              <ul className="space-y-2">
                {user.tarefas.length > 0 ? (
                  user.tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded flex justify-between items-center group/item">
                      <span className="truncate max-w-[150px]">{tarefa.titulo}</span>
                      <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleEditarTarefa(tarefa.id, tarefa.titulo)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-5 w-5 text-red-500" onClick={() => handleDeletarTarefa(tarefa.id, tarefa.titulo)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-400 italic text-center py-2">Nenhuma tarefa</li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}