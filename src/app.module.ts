import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRole } from "./roles/users-roles.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProfilesModule } from './profiles/profiles.module';
import * as path from 'path';
import { Profile } from "./profiles/profiles.model";
import { File } from "./files/files.model";
import { BlocksModule } from './blocks/blocks.module';
import { Block } from "./blocks/blocks.model";

// Главный модуль программы 
@Module({
    // Контроллеры. в которых содержатся методы для обработки запросов к RestAPI
    controllers: [],
    // Сервисы
    providers: [],
    // Импорт дополнительных модулей
    imports: [
        // Модуль конфигурации
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve( __dirname, 'static'),
        }),
        // Модуль для работы с БД
        SequelizeModule.forRoot({
            // Конфигурация БД
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            // Модели для БД 
            models: [User, Role, UserRole, Profile, File, Block],
            autoLoadModels: true,
        }),
        // Реализованные модули
        UsersModule,
        RolesModule,
        AuthModule,
        FilesModule,
        ProfilesModule,
        BlocksModule,
    ],
})
export class AppModule {};