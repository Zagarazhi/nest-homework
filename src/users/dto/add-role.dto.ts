import { IsString, IsNumber } from "class-validator";

// DTO-класс для добавления роли
export class AddRoleDto {
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}