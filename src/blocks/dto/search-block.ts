import { IsString } from "class-validator";

// Класс для поиска блока по части названия группы
export class SearchBlock {
    @IsString()
    group: string;
}