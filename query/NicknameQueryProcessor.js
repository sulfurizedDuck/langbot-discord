const database = require('../db/database');
const queries = require('./Queries');

module.exports = {
  insertNickname: async(unitName, nickname) => {
    let units = await database.query(queries.getUnitByName, [unitName]);
    if (units.rowCount == 0) {
      units = await database.query(Queries.getUnitByNickname, [unitName]);
      if (units.rowCount == 0) return `Unit named ${unitName} not found...`;
    }

    const existingNickname = await database.query(queries.getUnitByNickname, [nickname]);
    if (existingNickname.rowCount != 0) return `Nickname ${nickname} already taken...`;

    const unit = units.rows[0];
    const unitId = unit.id;

    await database.query(queries.insertNickname, [unitId, nickname]);
    
    let response = `Nickname ${nickname} has been successfully added for ${unit.name}`;
    return response;
  },
  getNickname: async(unitName) => {
    let nicknames = await database.query(queries.getNicknamesForUnit, [unitName]);

    if (nicknames.rowCount == 0) {
      return `No nickname set for ${unitName} yet...`;
    }

    nicknames = nicknames.rows.map(row => row.nickname);

    let response = `
${unitName}
Nicknames: ${nicknames.join(', ')}
    `;

    return response;
  },
};