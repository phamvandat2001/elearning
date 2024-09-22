module.exports = (app, sequelize) => {
    const { DataTypes, QueryTypes } = require('sequelize');

    const user = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            field: 'email',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at',
        },
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    });

    // add custom function from database
    user.findAllWithFilter = async (filter) => {
        const t = await sequelize.transaction();
        try {
            const stringFilter = JSON.stringify(filter);
            
            // Step 1: run function to store function result in refcursor 'ref'
            await sequelize.query(`SELECT test_call_function('ref', :filter);`, {
                replacements: { filter: stringFilter },
                transaction: t,
                type: QueryTypes.SELECT,
            });
            // Step 2: get result from refcursor
            const [result] = await sequelize.query(`FETCH ALL IN "ref";`, { transaction: t });
            // Step 3: close refcursor in transaction
            await sequelize.query(`CLOSE "ref";`, { transaction: t });
            // Step 4: commit transaction
            await t.commit();

            return result;
        } catch (error) {
            await t.rollback();
            throw new Error('- Execute function test_call_function failed!', error);
        }
    };

    app.model.users = user;
};