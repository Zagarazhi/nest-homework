import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    // Инъкция зависимостей
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    // Функция, которая будет выполнена перед выполнением действия 
    // (контроллера) для проверки наличия необходимых прав у пользователя
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            // Получаем роли, которые необходимы для выполнения действия
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            // Если роли не указаны, то разрешаем доступ
            if(!requiredRoles) {
                return true;
            }
            
            // Проверяем, что пользователь авторизован и имеет необходимые права
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            
            // Если пользователь не авторизован, то выдаем исключение
            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"});
            }
            
            // Если пользователь авторизован, то получаем его данные и проверяем права
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
            // Если проверка завершена успешно, то разрешаем доступ
            // Если пользователь не имеет необходимых прав, то выдаем исключение
            // и запрещаем выполнение действия
        } catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN);
        }
    }
}