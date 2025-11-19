export interface Tarefa {
    id: number;
    titulo: string;
    idUsuario: number;
    concluida?: boolean;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
}

export interface UsuarioComTarefas extends Usuario {
    tarefas: Tarefa[];
}