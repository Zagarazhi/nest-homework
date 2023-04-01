import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "src/profiles/profiles.model";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/roles/users-roles.model";

// Интефейс, в котором записаны поля, необходимые для создания объекта класса
interface UserCreationAttrs {
    email: string;
    password: string;
}

// Модель для работы с таблицей пользователей
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    // Колонка id типа INTEGER, которая является первичным ключем таблицы
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // Колонка почты, которая должна быть не пустой и уникальной для каждого пользователя
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    // Колонка пароль, которая должна быть не пустой
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    // Роли пользователя
    // Первый параметр - с какой сущностью связь
    // Второй параметр - через что связь
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    // Профиль пользователя
    @HasOne(() => Profile)
    profile: Profile;
}