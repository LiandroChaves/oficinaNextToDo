import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateTarefaDto } from "../dto/create-tarefa.dto";
import { UpdateTarefaDto } from "../dto/update-tarefa.dto";
import { TarefaService } from "../service/tarefa.service";


@Controller('tarefas')
export class TarefaController {
    constructor(private readonly service: TarefaService) { }

    @Get()
    public findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    public findById(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id)
    }

    @Post()
    public insert(@Body() dto: CreateTarefaDto) {
        return this.service.insert(dto)
    }

    @Delete(':id')
    public remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id)
    }

    @Put(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTarefaDto) {
        return this.service.update(id, dto)
    }
}