const mongojs = require('mongojs');
const db = mongojs('customers', ['transaction']);

const database = {
    mongojs: mongojs,
    db: db
};

module.exports = database;