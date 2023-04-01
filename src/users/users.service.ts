import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

// Генарация сервиса
// nest generate service users
@Injectable()
export class UsersService {

    // Инъекция зависимостей
    // Объекты создает сам Нест
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    // Создание пользователя с использованием DTO
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role?.id]);
        // При создании пользователя функция $set добавляет роль к записи в БД,
        // однако чтобы добавить роль в объект, необходима следующая строчка
        user.roles = [role];
        return user;
    }

    // Получение всех пользователей
    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    // Получение пользователя по почте
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        if (user) return user;
        return null;
    }

    // добавление роли пользователю
    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if(role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
