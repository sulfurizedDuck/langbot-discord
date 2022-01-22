const database = require('../db/database');
const Queries = require('./Queries');

module.exports = {
  updateBuild: async(unitName, buildUrl) => {
    if (!buildUrl) {
      return "build preferences not found!";
    }

    unitName = unitName.toLowerCase();
    let units = await database.query(Queries.getUnitByName, [unitName]);

    if (units.rowCount == 0) {
      units = await database.query(Queries.getUnitByNickname, [unitName]);
      if (units.rowCount == 0) return null;
    }
    const unit = units.rows[0];
    const unitId = unit.id;

    await database.query(Queries.updateBuildPref, [buildUrl, unitId]);

    return "Update success!";
  },
  getBuild: async(unitName) => {
    unitName = unitName.toLowerCase();
    let units = await database.query(Queries.getUnitByName, [unitName]);

    if (units.rowCount == 0) {
      units = await database.query(Queries.getUnitByNickname, [unitName]);
      if (units.rowCount == 0) return null;
    }
    const unit = units.rows[0];

    let response = unit.build_pref;

    return response;
  }
}