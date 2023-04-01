import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRole } from "./users-roles.model";

// Интефейс, в котором записаны поля, необходимые для создания объекта класса
interface RoleCreationAttrs {
    value: string;
    description: string;
}

// Модель для работы с таблицей ролей
@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCreationAttrs> {
    // Колонка id типа INTEGER, которая является первичным ключем таблицы
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // Колонка название роли, которая должна быть не пустой и уникальной
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    // Колонка описание роли
    @Column({type: DataType.STRING})
    description: string;

    // Пользователи роли
    // Первый параметр - с какой сущностью связь
    // Второй параметр - через что связь
    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}