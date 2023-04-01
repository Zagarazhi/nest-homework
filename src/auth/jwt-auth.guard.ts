import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

// Этот класс реализует интерфейс CanActivate, который можно использовать для установки
// допустимых ролей к эндпоинтам, чтобы ограничить к ним доступ
@Injectable()
export class JwtAuthGuard implements CanActivate {

    // Инъкция зависимости
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        // Попытаться извлечь токен JWT из заголовков запроса и проверить его
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            // Если заголовок авторизации не соответствует ожидаемому формату или 
            // токен отсутствует, создается исключение, которое указывает, что 
            // пользователь не авторизован
            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }

            // Если верификация пользователя успешная, то аутентифицированный пользователь
            // добавляется в объект запроса
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"});
        }
    }
}