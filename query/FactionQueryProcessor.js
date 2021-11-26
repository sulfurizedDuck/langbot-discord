const database = require('../db/database');
const Queries = require('./Queries');

module.exports = {
  getUnitFaction: async(unitName) => {
    unitName = unitName.toLowerCase();

    let factions = await database.query(Queries.getFactionsByName, [unitName]);

    if (factions.rowCount == 0) {
      factions = await database.query(Queries.getFactionsByNickname, [unitName]);
      if (factions.rowCount == 0) return null;
    }

    const factionExtracted = factions.rows.map(row => row.fname);
    const unitRealName = factions.rows[0].uname;

    let response = `
${unitRealName}
Factions: ${factionExtracted.join(', ')}
    `;
    return response;

  }
};