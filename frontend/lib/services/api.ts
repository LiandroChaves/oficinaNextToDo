import { Usuario, UsuarioComTarefas, Tarefa } from "../types";

const API_URL = "http://localhost:3000";

export const api = {
    // --- LEITURA ---
    getUsuarios: async (): Promise<UsuarioComTarefas[]> => {
        try {
            const res = await fetch(`${API_URL}/usuarios`, { cache: "no-store" });
            if (!res.ok) return [];
            return res.json();
        } catch (error) { return []; }
    },
    getTodasTarefas: async (): Promise<Tarefa[]> => {
        try {
            const res = await fetch(`${API_URL}/tarefas`, { cache: "no-store" });
            if (!res.ok) return [];
            return res.json();
        } catch (error) { return []; }
    },

    // --- USUÁRIO ---
    createUsuario: async (data: { nome: string; email: string }) => {
        const res = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res.json();
    },
    updateUsuario: async (id: number, data: { nome: string; email: string }) => {
        await fetch(`${API_URL}/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },
    // Melhoria: Agora retorna a resposta para podermos checar erros no front
    deleteUsuario: async (id: number) => {
        const res = await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.message || "Erro ao deletar");
        }
    },

    // --- TAREFA ---
    createTarefa: async (data: { titulo: string; idUsuario: number }) => {
        await fetch(`${API_URL}/tarefas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    },
    deleteTarefa: async (id: number) => {
        await fetch(`${API_URL}/tarefas/${id}`, { method: "DELETE" });
    },
    updateTarefa: async (id: number, titulo: string) => {
        await fetch(`${API_URL}/tarefas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo }),
        });
    }
};