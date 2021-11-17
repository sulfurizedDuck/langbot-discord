const database = require('../db/database');
const queries = require('./Queries');

module.exports = {
  getBond: async(unitName) => {
    unitName = unitName.toLowerCase();
    let units = await database.query(queries.getUnitByName, [unitName]);

    if (units.rowCount == 0) {
      units = await database.query(queries.getUnitByNickname, [unitName]);
      if (units.rowCount == 0) return null;
    }
    const unit = units.rows[0];

    let unlocksAttackFor = await database.query(queries.getAtkBondLockedBy, [unit.name]);
    let unlocksDefFor = await database.query(queries.getDefBondLockedBy, [unit.name]);

    unlocksAttackFor = unlocksAttackFor.rows.map(row => row.name);
    unlocksDefFor = unlocksDefFor.rows.map(row => row.name);

    let response = `
${unit.name}
Attack Bond: ${unit.atk_bond}
Defense Bond: ${unit.def_bond}
Unlocks attack bond for: ${unlocksAttackFor.length == 0 ? '-' : unlocksAttackFor.join(', ')}
Unlocks def bond for: ${unlocksDefFor.length == 0 ? '-' : unlocksDefFor.join(', ')}
    `;

    return response;
  }
};