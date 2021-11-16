const database = require('../db/database');

const queries = {
  getUnitByName: "SELECT * FROM units WHERE LOWER(name) = LOWER($1) LIMIT 1;",
  getAtkBondLockedBy: "SELECT name FROM units WHERE LOWER(atk_bond) = LOWER($1)",
  getDefBondLockedBy: "SELECT name FROM units WHERE LOWER(def_bond) = LOWER($1)",
}

module.exports = {
  getBond: async(unitName) => {
    unitName = unitName.toLowerCase();
    const units = await database.query(queries.getUnitByName, [unitName]);

    if (units.rowCount == 0) return null;
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