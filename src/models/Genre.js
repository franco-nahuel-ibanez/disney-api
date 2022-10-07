const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const Genre = sequelize.define('Genre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'genres',
})


module.exports = Genre;
