const database = require('../db/database');

const queries = {
  getUnitByName: "SELECT * FROM units WHERE LOWER(name) = LOWER($1) LIMIT 1;",
  insertNickname: "INSERT INTO nicknames(unit_id, nickname) VALUES($1, $2);",
};

module.exports = {
  insertNickname: async(unitName, nickname) => {
    const units = await database.query(queries.getUnitByName, [unitName]);
    if (units.rowCount == 0) return `Unit named ${unitName} not found...`;

    const unit = units.rows[0];
    const unitId = unit.id;

    await database.query(queries.insertNickname, [unitId, nickname]);
    
    let response = `Nickname ${nickname} has been successfully added for ${unit.name}`;
    return response;
  }
};