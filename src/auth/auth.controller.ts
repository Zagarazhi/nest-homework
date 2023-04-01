import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

// Генарация контроллера
// nest generate controller auth
@Controller('auth')
export class AuthController {

    // Инъекция зависимости
    constructor(private authService: AuthService) {}

    // Эндпоинты

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}
