import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './files.model';
import { FilesController } from './files.controller';
import { Block } from 'src/blocks/blocks.model';
import { AuthModule } from 'src/auth/auth.module';

// Генарация модуля
// nest generate module files
@Module({
    providers: [FilesService],
    imports: [
        SequelizeModule.forFeature([File, Block]),
        AuthModule,
    ],
    exports: [FilesService],
    controllers: [FilesController]
})
export class FilesModule {}
