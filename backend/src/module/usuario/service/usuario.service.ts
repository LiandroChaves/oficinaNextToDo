import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { UpdateUsuarioDto } from "../dto/update-usuario.dto";

type UsuarioSafe = {
    id: number,
    nome: string,
    email: string,
}

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) { }
    private selectSafe() {
        return {
            id: true,
            nome: true,
            email: true,
        } as const;
    }

    public findAll(): Promise<UsuarioSafe[]> {
        return this.prisma.usuario.findMany({
            select: this.selectSafe(),
            orderBy: { id: 'asc' }
        })
    }

    public async findById(id: number): Promise<UsuarioSafe | null> {
        const usuario = await this.prisma.usuario.findUnique({
            select: this.selectSafe(),
            where: { id }
        })
        if (!usuario) throw new BadRequestException("Usuario não existente!")
        return usuario;
    }

    public async remove(id: number): Promise<UsuarioSafe> {
        const count = await this.prisma.tarefa.count({
            where: { idUsuario: id }
        });
        if (count > 0) throw new BadRequestException("Não é possível excluir: usuário possui tarefas vinculadas.");
        return this.prisma.usuario.delete({
            select: this.selectSafe(),
            where: { id }
        })
    }

    public async insert(dto: CreateUsuarioDto): Promise<UsuarioSafe> {
        return this.prisma.usuario.create({
            select: this.selectSafe(),
            data: {
                nome: dto.nome,
                email: dto.email
            }
        })
    }
    
    public async update(id: number, dto: UpdateUsuarioDto): Promise<UsuarioSafe> {
        const existe = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!existe) throw new BadRequestException("Usuário não existente!");
        return this.prisma.usuario.update({
            select: this.selectSafe(),
            where: { id },
            data: {
                nome: dto.nome,
                email: dto.email
            }
        });
    }

}