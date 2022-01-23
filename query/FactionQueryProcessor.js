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
  },
  setUnitFaction: async(unitName, unitFactions) => {
    unitName = unitName.toLowerCase();
    let units = await database.query(Queries.getUnitByName, [unitName]);

    if (units.rowCount == 0) {
      units = await database.query(Queries.getUnitByNickname, [unitName]);
      if (units.rowCount == 0) return null;
    }
    const unit = units.rows[0];
    const unitId = unit.id;

    const factions = await database.query(Queries.getAllFactions, []);
    const extractedFactions = factions.rows;

    const unitFactionObjects = unitFactions.map(unitFaction => 
      extractedFactions.find(ef => ef.name.toLowerCase() == unitFaction.toLowerCase()) ?? '-');

    const unidentifiedFactionIndex = unitFactionObjects.findIndex(factionId => factionId == '-');
    if (unidentifiedFactionIndex != -1) {
      return `Faction number ${unidentifiedFactionIndex+1} isn't recognized!`;
    }

    const unitFactionIds = unitFactionObjects.map(factionObject => factionObject.id);

    await database.query(Queries.removeFactionsFromUnit, [unitId]);

    for (const factionId of unitFactionIds) {
      await database.query(Queries.addFactionToUnit, [unitId, factionId]);
    }
    
    return "Factions added to unit!";
  },
};