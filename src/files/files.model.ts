import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Block } from "src/blocks/blocks.model";

// Интефейс, в котором записаны поля, необходимые для создания объекта класса
interface FileCreationAttrs {
    path: string;
    essenceTable: string;
    essenceId: number;
}

// Модель для работы с таблицей ролей
@Table({tableName: 'files'})
export class File extends Model<File, FileCreationAttrs> {
    // Колонка id типа INTEGER, которая является первичным ключем таблицы
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // Колонка имени, которая должна быть не пустой
    @Column({type: DataType.STRING, allowNull: false})
    path: string;

    // Колонка таблицы, к которой относится файл
    @Column({type: DataType.STRING})
    essenceTable: string;

    // Колонка id записи в таблице, к которой относится файл
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => Block)
    essenceId: number;

    @BelongsTo(() => Block, 'essenceId')
    block: Block;
}