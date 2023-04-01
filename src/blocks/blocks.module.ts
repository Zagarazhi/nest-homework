import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from 'src/files/files.model';
import { Block } from './blocks.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

// Генарация модуля
// nest generate module blocks
@Module({
    providers: [BlocksService],
    controllers: [BlocksController],
    imports: [
        SequelizeModule.forFeature([File, Block]),
        FilesModule,
        AuthModule,
    ],
    exports: [BlocksService],
})
export class BlocksModule {}
