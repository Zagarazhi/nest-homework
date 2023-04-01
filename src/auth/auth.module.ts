import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

// Генарация модуля
// nest generate module auth
@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        // Обработка циклической зависимости модулей
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
                // Время жизни токена
                expiresIn: '24h',
            },
        }),
    ],
    exports: [
        AuthService,
        JwtModule,
    ],
})
export class AuthModule {}
