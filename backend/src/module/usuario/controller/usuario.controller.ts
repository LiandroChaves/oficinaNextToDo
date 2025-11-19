import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { UsuarioService } from "../service/usuario.service";


@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly service: UsuarioService) { }

    @Get()
    public findAll() {
        return this.service.findAll()
    }

    @Get(':id')
    public findById(@Param('id', ParseIntPipe) id: number) {
        return this.service.findById(id)
    }

    @Post()
    public insert(@Body() dto: CreateUsuarioDto) {
        return this.service.insert(dto)
    }

    @Delete(':id')
    public remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id)
    }

    @Put(':id')
    public update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUsuarioDto) {
        return this.service.update(id, dto)
    }
}