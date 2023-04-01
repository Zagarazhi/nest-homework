import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { SearchBlock } from './dto/search-block';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

// Генарация контроллера
// nest generate controller blocks
@Controller('blocks')
export class BlocksController {

    // Инъекция зависимости
    constructor(private readonly blocksService: BlocksService) {}

    // Создание нового блока
    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async create(@Body() createBlockDto: CreateBlockDto) {
        return this.blocksService.create(createBlockDto);
    }

    // Получение всех блоков
    @Get()
    async findAll() {
        return this.blocksService.findAll();
    }

    // Получение блоков группе
    @Get('/group/')
    async findByGroup(@Body() searchBlock: SearchBlock) {
        return this.blocksService.findAllByGroup(searchBlock.group);
    }

    // Получение конкретного блока по id
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.blocksService.findOne(id);
    }

    // Обновление конкретного блока по id
    @Put(':id')
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async update(@Param('id') id: number, @Body() updateBlockDto: CreateBlockDto) {
        return this.blocksService.update(+id, updateBlockDto);
    }

    // Удаление конкретного блока по id
    @Delete(':id')
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async delete(@Param('id') id: number) {
        return this.blocksService.delete(+id);
    }
}