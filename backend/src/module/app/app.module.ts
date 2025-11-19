import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { TarefaModule } from '../tarefa/tarefa.module';
import { UsuarioModule } from '../usuario/usuario.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        UsuarioModule,
        TarefaModule
    ]
})
export class AppModule { }
