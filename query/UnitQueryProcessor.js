const database = require('../db/database');
const queries = require('./Queries');

module.exports = {
  getAllUnits: async() => {
    let units = await database.query(queries.getAllUnits, []);
    
    units = units.rows.map(unit => unit.name);
    return units.join(', ');
  }
};