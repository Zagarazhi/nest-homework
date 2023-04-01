import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from 'src/profiles/profiles.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRole } from 'src/roles/users-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

// Генарация модуля
// nest generate module users
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole, Profile]),
        RolesModule,
        // Обработка циклической зависимости модулей
        forwardRef(() => AuthModule),
    ],
    exports: [
        UsersService,
    ],
})
export class UsersModule {}
