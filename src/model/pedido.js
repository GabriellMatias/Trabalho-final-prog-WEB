const Sequelize = require('sequelize');
const database = require('../db');

const Pedido = database.define('pedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sabor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    acompanhamentos: {
        type: Sequelize.STRING,
        allowNull: true
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Pedido;
