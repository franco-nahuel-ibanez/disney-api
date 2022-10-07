const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Movie = require('./Movie');

const Character = sequelize.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    history:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    tableName: 'characters',
});




module.exports = Character;


