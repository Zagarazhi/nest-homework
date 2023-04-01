import { Body, Controller, Delete, Get, Param, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

// Генарация контроллера
// nest generate controller files
@Controller('files')
export class FilesController {

    // Инъекция зависимости
    constructor(private filesService: FilesService) {}

    // Добавление файла
    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor("image"))
    async createFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.createFile(file);
    }

    // Получение файла по id
    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.filesService.getById(id);
    }

    // Удаление устаревших файлов
    @Delete()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async deleteExpiredFiles() {
        await this.filesService.deleteExpiredFiles();
    }
}
