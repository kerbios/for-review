const { Sequelize, DataTypes, Model, Deferrable } = require('sequelize');

class Message extends Model {}

module.exports = sequelize => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ALL'
        },
        datetime: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        }
        }, {
            sequelize,
            modelName: 'Message',
            tableName: 'messages',
            timestamps: true,
            createdAt: true,
            updatedAt: true
        }
    );

    return Message;
};