import { IsString } from "class-validator";

export class SearchRole {
    @IsString()
    value: string;
}