export interface Tarefa {
    id: number;
    titulo: string;
    idUsuario: number;
    // Adicionei '?' pois no seu schema original não tinha, 
    // mas no meu exemplo anterior eu sugeri adicionar.
    concluida?: boolean;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
}

// Tipo composto: Usuário já com as Tarefas (usado quando faz o include: { tarefas: true })
export interface UsuarioComTarefas extends Usuario {
    tarefas: Tarefa[];
}