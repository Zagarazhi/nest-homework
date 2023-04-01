import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

// Модель для создания связи многие ко многим у таблиц пользователей и ролей
@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {

    @PrimaryKey
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}