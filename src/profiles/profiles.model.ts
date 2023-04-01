import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

// Интефейс, в котором записаны поля, необходимые для создания объекта класса
interface ProfileCreationAttrs {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    userId: number;
}

// Модель для работы с таблицей ролей
@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    // Колонка id типа INTEGER, которая является первичным ключем таблицы
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // Колонка имени, которая должна быть не пустой
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    // Колонка фамилии, которая должна быть не пустой
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    // Колонка отчества
    @Column({type: DataType.STRING})
    middleName: string;

    // Колонка телефона
    @Column({type: DataType.STRING})
    phone: string;

    // Колонка id пользователя, которая должна быть не пустой
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    // К какому пользователю относится
    @BelongsTo(() => User)
    user: User;
}