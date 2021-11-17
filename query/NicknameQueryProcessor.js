const database = require('../db/database');
const queries = require('./queries');

module.exports = {
  insertNickname: async(unitName, nickname) => {
    const units = await database.query(queries.getUnitByName, [unitName]);
    if (units.rowCount == 0) return `Unit named ${unitName} not found...`;

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