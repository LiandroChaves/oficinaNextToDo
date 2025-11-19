import { Module } from '@nestjs/common';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './service/usuario.service';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService]
})
export class UsuarioModule { }
