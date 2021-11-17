const database = require('../db/database');
const queries = require('./Queries');

module.exports = {
  getAllUnits: async() => {
    let units = await database.query(queries.getAllUnits, []);
    
    units = units.rows.map(unit => unit.name);
    return units.join(', ');
  },
  addUnit: async(unitName, atkBond, defBond) => {
    if (!unitName || !atkBond || !defBond) {
      return "Input invalid...";
    }

    let existingUnit = await database.query(queries.getUnitByName, [unitName]);
    if (existingUnit.rowCount != 0) {
      return "Unit already inserted...";
    }

    if (atkBond != '-') {
      let atkBondUnit = await database.query(queries.getUnitByName, [atkBond]);
      if (atkBondUnit.rowCount == 0) {
        return "Atk bond unit is not found...";
      }
    }

    if (defBond != '-') {
      let defBondUnit = await database.query(queries.getUnitByName, [defBond]);
      if (defBondUnit.rowCount == 0) {
        return "Def bond unit is not found...";
      }
    }

    await database.query(queries.insertUnit, [unitName, atkBond, defBond]);

    return "Insert success!";
  },
};