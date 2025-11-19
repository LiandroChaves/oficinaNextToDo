import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { CreateTarefaDto } from "../dto/create-tarefa.dto";
import { UpdateTarefaDto } from "../dto/update-tarefa.dto";

type TarefaSafe = {
    id: number,
    titulo: string,
    idUsuario: number,
}

@Injectable()
export class TarefaService {
    constructor(private readonly prisma: PrismaService) { }

    private selectSafe() {
        return {
            id: true,
            titulo: true,
            idUsuario: true,
        } as const;
    }

    public findAll(): Promise<TarefaSafe[]> {
        return this.prisma.tarefa.findMany({
            select: this.selectSafe(),
            orderBy: { id: 'asc' }
        })
    }

    public findById(id: number): Promise<TarefaSafe | null> {
        return this.prisma.tarefa.findUnique({
            select: this.selectSafe(),
            where: { id }
        });
    }

    public remove(id: number): Promise<TarefaSafe> {
        return this.prisma.tarefa.delete({
            select: this.selectSafe(),
            where: { id }
        })
    }

    public async insert(dto: CreateTarefaDto): Promise<TarefaSafe> {
        return this.prisma.tarefa.create({
            data: {
                titulo: dto.titulo,
                idUsuario: dto.idUsuario
            }
        })
    }

    public async update(id: number, dto: UpdateTarefaDto): Promise<TarefaSafe> {
        const tarefa = await this.prisma.tarefa.findUnique({
            where: { id }
        })
        if (!tarefa) throw new BadRequestException("Tarefa não existente.")
        return this.prisma.tarefa.update({
            where: { id },
            data: {
                titulo: dto.titulo
            }
        })
    }
}