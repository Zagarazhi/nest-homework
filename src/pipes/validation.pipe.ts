import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any>{

    // PipeTransform преобразует входные данные (value) и возвращает преобразованные данные
    async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
        // Создаем экземпляр класса из полученных данных    
        const obj = plainToInstance(metadata.metatype, value);
        // Валидируем объект при помощи библиотеки class-validator
        const errors = await validate(obj);

        // Если есть ошибки, то генерируем исключение ValidationException
        if(errors.length) {
            // Создаем массив сообщений об ошибках исходя из полученных данных
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
            });
            // Генерируем исключение ValidationException с сообщениями об ошибках
            throw new ValidationException(messages);
        }
        // Если ошибок нет, то возвращаем исходные данные
        return value;
    }
}