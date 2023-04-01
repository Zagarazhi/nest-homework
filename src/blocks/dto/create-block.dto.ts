import { IsString, IsNumber } from "class-validator";

// DTO-класс для создания блоков
export class CreateBlockDto {
    @IsString()
    name: string
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    group: string;
    @IsNumber({},{each: true})
    filesId: number[];
}