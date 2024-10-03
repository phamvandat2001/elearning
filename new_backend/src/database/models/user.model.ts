import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({
    modelName: 'users',
    timestamps: false,
    underscored: true,
})
export default class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;

    @Column({
        type: DataType.DATE,
    })
    dateOfBirth!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: Date.now(),
    })
    createdAt!: Date;

    // define custom database function here!
    public async getWithDetail() {}
}