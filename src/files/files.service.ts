import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './files.model';

// Генарация сервиса
// nest generate service files
@Injectable()
export class FilesService {

    // Инъекция зависимости
    constructor(@InjectModel(File) private fileRepository: typeof File) {}

    // Добавление файла
    async createFile(file: any) {
        try {
            // Генерируем уникальное имя файла
            const fileName = uuid.v4() + '.jpg';
            // Указываем путь к папке для сохранения файла
            const filePath = path.resolve(__dirname, '..', 'static')
            // Проверяем наличие папки для сохранения файла, если ее нет - создаем рекурсивно
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            // Записываем файл на сервер
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            // Запись информации о файле в базу данных
            const fileObj = await this.fileRepository.create({path: path.join(filePath, fileName)});
            return fileObj;
        } catch (e) {
            // В случае ошибки возвращаем ошибку сервера
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Получение файла по id
    async getById(id: number) {
        const file = await this.fileRepository.findByPk(id);
        return file;
    }

    // Удаление файла
    async deleteExpiredFiles() {
        const now = new Date();
        const files = await this.fileRepository.findAll();
        for (const file of files) {
            const createdAt = new Date(file.createdAt);
            const diff = now.getTime() - createdAt.getTime();
            if (diff > 60 * 60 * 1000 && !file.essenceTable && !file.essenceId) {
                const filePath = file.path;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                await file.destroy();
            }
        }
    } 
}