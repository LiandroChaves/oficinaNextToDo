import { Module } from '@nestjs/common';
import { TarefaController } from './controller/tarefa.controller';
import { TarefaService } from './service/tarefa.service';

@Module({
    controllers: [TarefaController],
    providers: [TarefaService]
})
export class TarefaModule { }
