import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { SearchRole } from './dto/search-role';

// Генарация контроллера
// nest generate controller roles
@Controller('roles')
export class RolesController {

    // Инъекция зависимости
    constructor(private roleService: RolesService) {}

    // Эндпоинты

    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getByValue(@Body() searchRole: SearchRole) {
        console.log(searchRole.value);
        return this.roleService.getRoleByValue(searchRole.value);
    }
}
