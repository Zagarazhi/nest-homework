import { Column, DataType, Model, Table, HasMany, ForeignKey } from "sequelize-typescript";
import { File } from "src/files/files.model";

// Интефейс, в котором записаны поля, необходимые для создания объекта класса
interface BlockCreationAttrs {
    name: string
    title: string;
    content: string;
    group: string;
    images: File[];
}

// Модель для работы с таблицей блоков
@Table({tableName: 'blocks'})
export class Block extends Model<Block, BlockCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;

    @ForeignKey(() => File)
    @Column({type: DataType.ARRAY(DataType.INTEGER), allowNull: true, defaultValue: []})
    filesId: number[];

    @HasMany(() => File)
    images: File[];
}