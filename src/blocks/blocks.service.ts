import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Block } from './blocks.model';
import { FilesService } from 'src/files/files.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { Op } from 'sequelize';

// Генарация сервиса
// nest generate service blocks
@Injectable()
export class BlocksService {

    // Инъекция зависимостей
    constructor(@InjectModel(Block) private blockRepository: typeof Block,
                private fileService: FilesService) {}

    // Добавление блока
    async create(dto: CreateBlockDto) {
        const block = await this.blockRepository.create(dto);
        for (const id of dto.filesId) {
            try {
                const file = await this.fileService.getById(id);
                await file.update({
                    essenceTable: "blocks",
                    essenceId: block.id
                });
            } catch (error) {
                throw new NotFoundException(`Файл с ID ${id} не найден`);
            }
        }
        return block;
    }

    // Получить все блоки
    async findAll() {
        return await this.blockRepository.findAll({include: {all: true}});
    }

    // Получить блок по Id
    async findOne(id: number) {
        const block = await this.blockRepository.findByPk(id, {include: {all: true}});
        if (!block) {
            throw new NotFoundException(`Блок с ID ${id} не найден`);
        }
        return block;
    }

    // Обновить блок
    async update(id: number, dto: CreateBlockDto) {
        const block = await this.blockRepository.findByPk(id, {include: {all: true}});
        if (!block) {
            throw new NotFoundException(`Блок с ID ${id} не найден`);
        }
        await block.update(dto);
        const updatedFilesIds = dto.filesId || [];
        const oldFilesIds = block.filesId || [];

        const filesToRemove = oldFilesIds.filter(fileId => !updatedFilesIds.includes(fileId));
        for (const fileId of filesToRemove) {
            const file = await this.fileService.getById(fileId);
            await file.update({
                essenceTable: null,
                essenceId: null
            });
        }

        for (const fileId of updatedFilesIds) {
            try {
                const file = await this.fileService.getById(fileId);
                await file.update({
                    essenceTable: "blocks",
                    essenceId: block.id
                });
            } catch (error) {
                throw new NotFoundException(`Файл с ID ${fileId} не найден`);
            }
        }

        return block;
    }

    // Удалить блок
    async delete(id: number) {
        const block = await this.blockRepository.findByPk(id);
        if (!block) {
            throw new NotFoundException(`Блок с ID ${id} не найден`);
        }
        const filesIds = block.filesId || [];

        for (const fileId of filesIds) {
            const file = await this.fileService.getById(fileId);
            await file.$set("essenceTable", null);
            await file.$set("essenceId", null);
        }

        await block.destroy();
    }

    // Найти блок по группе
    async findAllByGroup(group: string) {
        const blocks = await this.blockRepository.findAll({
            where: {
                group: {
                    [Op.like]: `%${group}%`,
                },
            },
            include: {all: true},
        });
        return blocks;
    }
}
